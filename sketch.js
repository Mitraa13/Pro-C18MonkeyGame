var scene, backImage, monkey, monkey_running, obstacle, stoneimg, banana, bananaimg, bananaGroup, obstaclesGroup, invisibleGround, start, startimg, deadmkyimg, gameOver, restarti,gameimg,restartimg;

var score = 0;

var Intro = 0;
var Play = 1;
var End = 2;
var gameState = "Intro";

function preload() {
  backImage = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png",  "Monkey_09.png", "Monkey_10.png");
  
  deadmkyimg=loadAnimation("monkey_dead.png");

  bananaimg = loadImage("banana.png");

  stoneimg = loadImage("stone.png");

  startimg = loadImage("start.png");
  
  gameimg = loadImage("game_over.png");

  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);

  scene = createSprite(200, 10, 20, 20);
  scene.addImage(backImage);
  scene.scale = 2;
  scene.x = scene.width / 2;

  monkey = createSprite(50, 350, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.06;
  monkey.setCollider("rectangle", 0, 0, 500, 500);
  monkey.addAnimation("mkyimg",deadmkyimg);
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();

  invisibleGround = createSprite(300, 385, 600, 10);
  invisibleGround.visible = false;

  start = createSprite(300, 250, 20, 20);
      
  gameOver = createSprite(300,100,19,10);
  restarti = createSprite(300,300,10,10);
}

function draw() {
  background(220);


  if (gameState === "Intro") {
    gameOver.visible=false;
    restarti.visible=false;
    background("black");
    scene.visible = false;
    monkey.visible = false;
    start.addImage(startimg);
    fill("white");
    stroke("white");
    textAlign(CENTER);
    textSize(20);
    text("A monkey has escaped from a zoo!!! ", 300, 50);
    text("It is very hungry!!!", 300, 75);
    text("Can you help him???", 300, 100);
    text("If you want to help it press the button below.", 300, 125);
    text("'Note: Everytime you touch a stone your size will decrease.",300,150);
    //text("The size will start with the minimum size",300,175);
    text("If you reach the minimum size game will be over.'" ,300, 175);
    textSize(19.5);
    //text("If you reach the maximum size you cannot jump until you hit a stone'",300,225);
  }

  if (mousePressedOver(start)) {
    gameState = "Play";
  }

  if (gameState === "Play") {
    
    spawnBananas();
    spawnObstacles();
    
    gameOver.visible=false;
    restarti.visible=false;
    start.visible = false;

    scene.visible = true
    monkey.visible = true;

    console.log(monkey.scale);
    
    scene.velocityX = -(6+score/10);

    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }
    if (keyDown("space") && monkey.y > 353) {
      monkey.velocityY = -15;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 2;
      switch (score) {
        case 10: monkey.scale = monkey.scale+0.02;
          break;
        case 20: monkey.scale = monkey.scale+0.02;
          break;
        case 30: monkey.scale = monkey.scale+0.02;
          break;
        case 40: monkey.scale = monkey.scale+0.02;  
          break;
        default: break;  
      }
        if(monkey.scale===0.12000000000000001){
           monkey.scale=monkey.scale-0.02;
        }
    }

  }

      if(obstaclesGroup.collide(monkey)){
        obstaclesGroup.destroyEach();
         monkey.scale=monkey.scale-0.02;
         score=0;
      }
  
      if(monkey.scale<=0.04){
         gameState="End";
      }
  
  if (gameState === "End") {    
    
    gameOver.visible=true;
    restarti.visible=true;
    start.visible = false;

    gameOver.addImage(gameimg);
    restarti.addImage(restartimg);
    
    scene.velocityX = 0;
    
    monkey.changeAnimation("mkyimg",deadmkyimg);
    
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restarti)){
      restart();
    }

  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(invisibleGround);

  drawSprites();


  fill("black");
  stroke("black");
  textSize(20);
  text("Score:"+score,500,20);
}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(610, 0, 10, 10);
    banana.y = Math.round(random(200, 300));
    banana.addImage(bananaimg);
    banana.scale = 0.04;
    banana.velocityX = -(6+score/10);
    banana.lifeTime = 120;
    bananaGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 350 === 0) {
    obstacle = createSprite(610, 365, 10, 40);
    obstacle.velocityX = -(6+score/10);
    obstacle.addImage(stoneimg);
    obstacle.scale = 0.18;
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,100);
    monkey.depth = obstacle.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function restart(){
  gameState="Play";
  gameOver.visible=false;
  monkey.scale=monkey.scale+0.02;
  monkey.changeAnimation("running",monkey_running);
  restarti.visible=false;
  score=0;
}



