var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage("ghost-standing", ghostImg);
  ghost.scale = 0.3

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  
}

function draw() {
  background(200);

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x += 2
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x -= 2
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
      gameState = "end"
    }

    spawnDoors()

    drawSprites()
  }
  else if(gameState === "end"){
    text("Game Over", 200,300)
  } 
}
function spawnDoors(){
  if(frameCount % 230 === 0){
    var door = createSprite(200,-50)
    var climber = createSprite(200,10)
    var invisibleBlock = createSprite(200,15)

    invisibleBlock.width = climber.width
    invisibleBlock.height = 2

    door.x = Math.round(random(100,500))
    climber.x = door.x
    invisibleBlock.x = door.x
    
    climber.addImage(climberImg)
    door.addImage(doorImg)

    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1

    door.depth = ghost.depth
    ghost.depth += 1
  }
}
