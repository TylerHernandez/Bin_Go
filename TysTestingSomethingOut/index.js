//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');

class Paddle{
  constructor(gameWidth, gameHeight)
  {
    this.width=150;
    this.height=30;


    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };
  }

  draw(ctx){
    ctx.fillStyle= '#f00';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

  }

  update(deltaTime)
  {
    if(!deltaTime) return;
    this.position.x += 5 / deltaTime;
  }

}


const GAME_WIDTH= 800;
const GAME_HEIGHT= 600;


let paddle= new Paddle(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(ctx);

let lastTime=0;

function gameLoop(timestamp)
{
  let deltaTime= timestamp - lastTime;
  lastTime=timestamp;

  ctx.clearRect(0,0,800,600);
  paddle.update(deltaTime);
  paddle.draw(ctx);


  requestAnimationFrame(gameLoop);


}

gameLoop();
