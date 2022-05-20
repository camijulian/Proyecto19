var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOverImg, gameOver;

var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("juego terminado.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  doorsGroup = createGroup();
  climbersGroup = createGroup();

}

function draw() {
  background(200);


  if(gameState===PLAY){
  

  if(keyDown("left_arrow")) {
    ghost.x += -3;
    }

  if(keyDown("right_arrow")) {
     ghost.x += 3;
    }

  if(keyDown("space")) {
    ghost.velocityY = -5;
    spookySound.play();

     }

  ghost.velocityY += 0.8; 
  
  if(doorsGroup.isTouching(ghost)){
    gameState = END;
    ghost.velocityY = 0;
    ghost.velocityX = 0;
  }

  if(climbersGroup.isTouching(ghost)){
    gameState = END;
    ghost.velocityY = 0;
    ghost.velocityX = 0;
  }
    
}else if(gameState === END){
  
  gameOver = createSprite(300,300);
  gameOver.addImage("gameOver",gameOverImg);
  
  ghost.velocityY = 0;
  ghost.velocityX = 0;
  tower.velocityY = 0;
  door.velocityY = 0;
  climber.velocityY = 0;  
spookySound.stop();

  reset();

}

function reset() {
doorsGroup.destroyEach();
climbersGroup.destroyEach();
ghost.remove(); 

}


  if(tower.y > 400){
      tower.y = 300
    }

    drawSprites();
    spawnDoors();
}

function spawnDoors() {
  
  if(frameCount % 240===0){
    door = createSprite(200,-50);
    door.addImage("door", doorImg);
    door.velocityY = 1;  
    door.x = Math.round(random(200, 400))
    door.lifetime = 800;
    doorsGroup.add(door);

    climber = createSprite(200,10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;  
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
   }
}



