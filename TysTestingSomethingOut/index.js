//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');

const GRAVITY= 5;
let Velocity_Y= - 100.0;
let Velocity_X= 100;


class Paddle{
  constructor(gameWidth, gameHeight)
  {
    this.width=30;
    this.height=30;

    this.position = {
      x: 200,
      y: 200
    };
  }

  draw(ctx){
    ctx.fillStyle= '#f00';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


  }

  update(deltaTime)
  {
    if(!deltaTime) return;
    this.position.x += Velocity_X/ deltaTime;
    this.position.y += Velocity_Y/ deltaTime ;
    Velocity_Y = Velocity_Y + GRAVITY;
  }

}



class Bins{
  constructor(gameWidth, gameHeight)
  {
    this.width=90;
    this.height=70;

    this.position= {
      x: 600,
      y: 500
    };
  }
  drawgreen(ctx)
  {
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

//paddle.draw(ctx);

let lastTime=0;



function gameLoop(timestamp)
{
   let deltaTime= timestamp - lastTime;
   lastTime=timestamp;

  ctx.clearRect(0,0,800,600);
  paddle.update(deltaTime);
  paddle.draw(ctx);

  redbin.drawred(ctx);
  redbin.position.x=400;

  bluebin.drawblue(ctx);
  bluebin.position.x=500;

  greenbin.drawgreen(ctx);
  greenbin.position.x=600;

  blackbin.drawblack(ctx);
  blackbin.position.x=700;


  requestAnimationFrame(gameLoop);


}

gameLoop();
