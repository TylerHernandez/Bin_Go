//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');

class Paddle{
  constructor(gameWidth, gameHeight)
  {
    this.width=90;
    this.height=60;


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

class Bins{
  constructor(gameWidth, gameHeight)
  {
    this.width=90;
    this.height=70;

    this.position= {
      x: 600,
      y: 400
    };



  }
  drawgreen(ctx){
    ctx.fillStyle='#32CD32';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  drawblue(ctx)
  {
    ctx.fillStyle='#87CEFA';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  drawblack(ctx)
  {
    ctx.fillStyle='	#000000';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  drawred(ctx)
  {
    ctx.fillStyle='#B22222';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}


const GAME_WIDTH= 800;
const GAME_HEIGHT= 600;


let paddle= new Paddle(GAME_WIDTH, GAME_HEIGHT);
let bluebin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let redbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let greenbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let blackbin=new Bins(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(ctx);

let lastTime=0;



function gameLoop(timestamp)
{
  let deltaTime= timestamp - lastTime;
  lastTime=timestamp;

  ctx.clearRect(0,0,800,600);
//  paddle.update(deltaTime);
  redbin.drawred(ctx);
  redbin.position.x=400;
  bluebin.drawblue(ctx);
  bluebin.position.x=500;
  greenbin.drawgreen(ctx);
  greenbin.position.x=600;
  blackbin.drawblack(ctx);
  blackbin.position.x=700;
  //paddle.draw(ctx);



  requestAnimationFrame(gameLoop);


}

gameLoop();
