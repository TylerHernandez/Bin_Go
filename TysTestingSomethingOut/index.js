//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');
const GRAVITY= 10;
let Velocity_Y= 10;
let Velocity_X= 100;

let Wind= Math.floor((Math.random() * 4.0) + .5);

class Object{
  constructor()
  {
    this.width=30;
    this.height=30;

    this.position = {
      x: 70,
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
    console.log(this.position.x);
    this.position.y += Velocity_Y/ deltaTime;
    Velocity_Y = Velocity_Y + GRAVITY;
    console.log(wind);
    //console.log(Velocity_Y)
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
    x: 55,
    y: 400
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


let testobj= new Object();
let testobj2= new Object();
let bluebin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let redbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let greenbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let blackbin=new Bins(GAME_WIDTH, GAME_HEIGHT);
let fan = new Fan();
let ty= new Person();
let lastTime=0;


function drawStuff(){
ctx.clearRect(0,0,800,600);
bluebin.position.x=325;
bluebin.drawblue(ctx);

greenbin.position.x=450;
greenbin.drawgreen(ctx);

blackbin.position.x=575;
blackbin.drawblack(ctx);

fan.drawFan(ctx);
ty.draw(ctx);
}
function initializeGameLoop()
{


  testobj.position.y=300;
  testobj.position.x=70;
  testobj2.position.y=300;
  testobj2.position.x=70;
  let element = document.querySelector("#idk");
  Velocity_Y= Number(element.value);
  //console.log('velocity')
  //console.log(Velocity_Y)
  gameLoop()


}

function gameLoop(timestamp){
  let deltaTime= timestamp-lastTime ;
  lastTime= timestamp;

  drawStuff();
  testobj.update(deltaTime, -Wind);
  testobj.draw(ctx);

  testobj2.update(deltaTime, +Wind);
  testobj2.draw(ctx);


if(testobj.position.y>900){
  Wind= Math.floor((Math.random() * 4.0) + .5);
  document.getElementById('windActualSpeed').innerHTML = Wind;
  return;
}

//console.log(Velocity_Y )
  requestAnimationFrame(gameLoop);
}
drawStuff();
document.getElementById('windActualSpeed').innerHTML = Wind;
document.getElementById("speedBut").addEventListener("click", initializeGameLoop);




//gameLoop();
