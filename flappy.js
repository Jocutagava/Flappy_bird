//Добавление обЪектов
	 let bird = new Image()
	 bird.src = 'img/bird.png'

	 let back = new Image()
	 back.src = 'img/back.png'

	 let road = new Image()
	 road.src = 'img/road.png'

	 let pipeup = new Image()
	 pipeup.src = 'img/pipeUp.png'

	 let pipebottom = new Image()
	 pipebottom.src = 'img/pipeBottom.png'
 




	let fly = new Audio()
	fly.src = 'audio/fly.mp3'

	let score = new Audio()
	score.src = 'audio/score.mp3'



			
let cvs = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


cvs.width = 256;
cvs.height = 512;

let pause = false
let scr = document.getElementById('score')
let bstscr = document.getElementById('bestScore')
let scor = 0
let bestScor = 0
let corX = 10
let corY = 150
let gravity = 0.2
let speedY = 0
let gap = 110
let pipe = [0]
pipe[0] = {
	x: cvs.width,
	y: 0
}

function game_pause(){
	pause = !pause
}

function draw() {

	

  if(!pause){
  	ctx.drawImage(back, 0, 0)
    ctx.drawImage(road, 0, cvs.height - road.height)
	


	if (corY + bird.height >= cvs.height - road.height) {
		reload()
	}
	if (corY  <= 0) {
		reload()
	}


	




    speedY += gravity
    corY += speedY

    for(let i = 0; i < pipe.length; i++){
      ctx.drawImage(pipeup, pipe[i].x, pipe[i].y)
      ctx.drawImage(pipebottom, pipe[i].x, pipe[i].y + pipeup.height + gap)
      pipe[i].x -= 2
      if (pipe[i].x == 80) {
      	pipe.push({
      		x: cvs.width,
	        y: Math.floor((Math.random() * pipeup.height) - pipeup.height)
      	})
      }

      if (pipe[i].x == 0) {
      	 score.play()
      	
       document.getElementById('score').innerHTML = 'Score: ' + (scor += 1)
      	

      }

      if (corX + bird.width == pipe[i].x && corY >= 0 && corY <= pipe[i].y + pipeup.height) {
      	reload()
      }
      if (corX + bird.width == pipe[i].x && corY >= pipe[i].y + pipeup.height + gap && corY <= 512 ) {
      	reload()
      }



    }
    ctx.drawImage(bird, corX, corY)
  }

  else{
  	ctx.drawImage(back, 0, 0)
    ctx.drawImage(road, 0, cvs.height - road.height)

     for(let i = 0; i < pipe.length; i++){
      ctx.drawImage(pipeup, pipe[i].x, pipe[i].y)
      ctx.drawImage(pipebottom, pipe[i].x, pipe[i].y + pipeup.height + gap)
      pipe[i].x -= 0}

      ctx.drawImage(bird, corX, corY)
      ctx.beginPath();

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, cvs.width, cvs.height)
  }
     


}

function moveUp() {
	speedY = -5
	 fly.play()
}
function reload() {
	
     
      corX = 10
     corY = 150
     gravity = 0.2

      speedY = 0
      pipe = []
      pipe[0] = {
	x: cvs.width,
	y: 0
}

    if(scor > bestScor){
    	bestScor = scor
    document.getElementById('bestScore').innerHTML = 'Best Score: ' + bestScor
}
    scor = 0
    document.getElementById('score').innerHTML = 'Score: ' + 0


}





cvs.addEventListener('mousedown', moveUp)
document.addEventListener('keydown', function(event){
	if(event.code == 'Space'){
		moveUp();
	}
})

setInterval(draw, 20)

