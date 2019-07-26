//import Paddle from 'paddle';
let canvas= document.getElementById("gameScreen");
let ctx= canvas.getContext('2d');
const GRAVITY= 10;
let Velocity_Y= 10;
let Velocity_X= 100;
let Power= 0;
let counter=0;
let Wind= Math.floor((Math.random() * 4.0) + .5);

class Object{
  constructor(objType)
  {
    this.isVisible= true;
    this.width=30;
    this.height=30;
    this.type=objType;

    this.position = {
      x: 70,
      y: 400
    };
  }

  draw(ctx){
    ctx.fillStyle= '#f00';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime, wind, objType, objectName)
  {
    if(!deltaTime) return;
    this.position.x += (Velocity_X+Power)/ deltaTime + wind;
    this.position.y += (Velocity_Y)/ deltaTime;
    Velocity_Y = Velocity_Y + GRAVITY;
    if(objType=='recycle')
      {
        checkInBlue(objectName);
      }
    if(objType=='compost')
      {
        checkInGreen();
      }
    if(objType=='waste')
      {
        checkinGreen();
      }

    //console.log(this.position.x + " " + this.position.y)
    //console.log(plastic_bottle.position.x<416)



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


let plastic_bottle= new Object("recycle");
let paper_ball= new Object("compost");
let
//let plastic_bottle2= new Object();
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
function initializeGameLoop(){
  plastic_bottle.position.y=300;
  plastic_bottle.position.x=70;
  //plastic_bottle2.position.y=300;
  //plastic_bottle2.position.x=70;
  let element = document.querySelector("#Velocity_Y");
  let secondelement = document.querySelector("#Power");
  Velocity_Y= Number(element.value)*-1;
  Power= Number(secondelement.value);

  //////console.log('velocity')
  //////console.log(Velocity_Y)
  gameLoop()


}
function gameLoop(timestamp){
  let deltaTime= timestamp-lastTime ;
  lastTime= timestamp;

  drawStuff();
  if(counter==0)
  {
  plastic_bottle.update(deltaTime, -Wind, "recycle", plastic_bottle);
  plastic_bottle.draw(ctx);
  }
  if(counter==1)
  {
  paper_ball.update(deltaTime, -Wind, "compost", paper_ball);
  paper_ball.draw(ctx);
  }

  //plastic_bottle2.update(deltaTime, +Wind);
//plastic_bottle2.draw(ctx);
// if plastic_bottle.position.y=400 and plastic_bottle.position.x= 600
//  console.log()
// }
if(plastic_bottle.position.y>900|| !plastic_bottle.isVisible){
  Wind= Math.floor((Math.random() * 4.0) + .5);
  document.getElementById('windActualSpeed').innerHTML = Wind;
  plastic_bottle.isVisible= true;
  return;
}
//counter+=1;
//////console.log(Velocity_Y )
  requestAnimationFrame(gameLoop);

}
//if object is recycling, checkInBlue
//if object is compost, checkInGreen
//if object is garbage, checkInBlack
function checkInBlue(objectName){
  if(objectName.position.y>400){
      if(objectName.position.x>324 && objectName.position.x<416)
      {
        console.log('Point!');
        objectName.isVisible=false;
        return;
      }
      else
      {
        console.log('Miss!');
      }

    }
}
function checkInGreen(objectName){
  if(objectName.position.y>400){
      if(objectName.position.x>449 && objectName.position.x<541)
      {
        console.log('Point!');
        objectName.isVisible=false;
      }
      else
      {
        console.log('Miss!');
      }

    }
}
function checkInBlack(objectName){
  if(objectName.position.y>400){
      if(objectName.position.x>574 && objectName.position.x<666)
      {
        console.log('Point!');
        objectName.isVisible=false;
      }
      else
      {
        console.log('Miss!');
      }

    }
}

drawStuff();
document.getElementById('windActualSpeed').innerHTML = Wind;
document.getElementById("Go").addEventListener("click", initializeGameLoop);

//gameLoop();
