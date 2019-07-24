//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');

const GRAVITY= 5;
let Velocity_Y= - 100.0;
let Velocity_X= 100;
let Wind= Math.floor((Math.random() * 4.0) + .5);
Wind/=2;
console.log(Wind)

class Object{
  constructor(gameWidth, gameHeight)
  {// this
    this.width=30;
    this.height=30;

    this.position = {
      x: 80,
      y: 300
    };
  }

  draw(ctx){
    ctx.fillStyle= '#f00';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime, wind)
  {
    if(!deltaTime) return;
    this.position.x += Velocity_X / deltaTime + wind;
    this.position.y += Velocity_Y/ deltaTime ;
    Velocity_Y = Velocity_Y + GRAVITY;
  }

}


class Fan{

  constructor()
  {

  this.width= 40;
  this.height=300;

  this.position= {
    x: 700,
    y: 300
  };

  }
  drawFan(ctx)
  {
    ctx.fillStyle='#808080';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

}

class Person{

  constructor()
  {

  this.width=40;
  this.height=300;

  this.position= {
    x: 75,
    y: 300
  };

  }
  draw(ctx)
  {
    ctx.fillStyle='#4B0082';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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

let testobj= new Object(GAME_WIDTH, GAME_HEIGHT);
let bluebin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let redbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let greenbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let blackbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let fan = new Fan();
let ty= new Person();


let lastTime=0;

document.write("Wind Speed: " + Wind);

function gameLoop(timestamp)
{
   let deltaTime= timestamp - lastTime;
   lastTime=timestamp;

  ctx.clearRect(0,0,800,600);
  testobj.update(deltaTime, -Wind);
  //document.write(Wind);
  // in object the four levels are -.50, -1, -1.5, and -2
  testobj.draw(ctx);
  fan.drawFan(ctx);
  ty.draw(ctx);


  bluebin.drawblue(ctx);
  bluebin.position.x=325;

  greenbin.drawgreen(ctx);
  greenbin.position.x=450;

  blackbin.drawblack(ctx);
  blackbin.position.x=575;


  requestAnimationFrame(gameLoop);


}

gameLoop();
