var bg1,bg1Img;
var bg2,bg2Img;
var path,pathImg;
var logo,logoImg;
var start,startImg;
var boy,boyImg;
var ground;
var snakeImg,mummyImg,scorpionImg,egyptImg;
var obstacle,oGroup;
var diamond,diamondImg,dGroup,dMusic;
var bgmusic,endMusic;
var jin,jinImg,jGroup;
var p1,p2,p3,puzzle;
var oMusic;
var reset,resetImg;
var gameState = "SERVE";
var score = 0;

function preload(){
  bg1Img = loadImage("./ps/bg1.jpg");
  logoImg = loadImage("./ps/logo.jpg");
  startImg = loadImage("./ps/start.png");
  bgmusic = loadSound("./ps/bgmusic.mp3");
  pathImg = loadImage("./ps/path.jpg");
  bg2Img = loadImage("./ps/bg2.jpg");
  boyImg = loadImage("./ps/boy.png");
  mummyImg = loadImage("./ps/mummy.png");
  snakeImg = loadImage("./ps/snake.png");
  scorpionImg = loadImage("./ps/scorpion.png");
  diamondImg = loadImage("./ps/diamond.png");
  endMusic = loadSound("./ps/gameoverM.wav");
  dMusic = loadSound("./ps/diamondM.wav");
  jinImg = loadImage("./ps/jin.png");
  egyptImg = loadImage("./ps/egypt.png");
  p1 = loadImage("./ps/Puzzle1.png");
  p2 = loadImage("./ps/Puzzle2.png");
  p3 = loadImage("./ps/Puzzle3.png");
  oMusic = loadSound("./ps/lostM.wav");
  resetImg= loadImage("./ps/reset.jpeg");

}

function setup(){
  createCanvas(displayWidth,displayHeight);
  bg1 = createSprite(displayWidth/2,displayHeight/2);
  bg1.scale = 1.5;
  logo = createSprite(displayWidth/2,displayHeight/2-270);
  logo.scale = 0.15;
  start = createSprite(displayWidth/2+20,displayHeight/2+200);
  start.scale = 0.5;
  path = createSprite(displayWidth/2+2,displayHeight/2+2,1,1);
  path.scale = 2;
  bg2 = createSprite(displayWidth/2+1,displayHeight/2+1,1,1);
  bg2.scale = 2;
  boy = createSprite(displayWidth/2-650,displayHeight-30,1,1);
  boy.scale = 0.7;
  boy.setCollider("rectangle",0,0,boy.width,boy.height+400)
  boy.debug = false;
  ground = createSprite(displayWidth/2,displayHeight-30,displayWidth*3,10);
  ground.visible = false;
  reset = createSprite(displayWidth/2-1,displayHeight/2-1,1,1);
  
  oGroup = new Group();
  dGroup = new Group();
  jGroup = new Group();
}

function draw(){
  background(0);

  if(gameState === "SERVE"){
    serve();
  }  
  else if(gameState === "PLAY"){
    play();
  }
  else if(gameState === "END"){
    end();
  }
  else if(gameState === "RESET"){
    reset();
  }  
}

function serve(){
  bg1.addImage("background1",bg1Img);
  logo.addImage("logo",logoImg);
  start.addImage("startbutton",startImg);
  //bgmusic.loop();
  if(mousePressedOver(start) || touches.length>0){
    gameState = "PLAY";
  }
  drawSprites();
  textStyle(BOLDITALIC)
  textSize(30);
  fill("black");
  text("Hey! WELCOME to the Cave Adventures!",displayWidth/2-300,displayHeight/2-90);
  text("There are many rumours in the village about Gold Treasure in the Cave Of Tharsis",displayWidth/2-600,displayHeight/2-50);
  text("A boy went there to find it!",displayWidth/2-300+10,displayHeight/2-10);
  text("Now, you are going to help that boy...",displayWidth/2-300,displayHeight/2+30);
  fill("red");
  text("CAUTION: Don't touch any of obstacle or you have to start again!!!",displayWidth/2-550,displayHeight/2+70);
   
}

function play(){
  console.log(gameState);
  score = score+frameCount/100;
  bg1.visible = false;
  logo.visible = false;
  path.addImage("path",pathImg);
  path.velocityX = -4;
  boy.addImage("player",boyImg);
  if((keyDown("space") && boy.y > displayHeight-600) || touches.length>0){
    boy.velocityY = -12;
  }
  boy.velocityY = boy.velocityY + 0.8;
  boy.collide(ground);
  if(frameCount % 200 === 0){
    obstacle = createSprite(displayWidth,displayHeight-100,1,1);
    obstacle.scale = 0.3;    
    obstacle.velocityX = -4;
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1 : obstacle.addImage("mummy",mummyImg);
      break;
      case 2 : obstacle.addImage("scorpion",scorpionImg);
      break;
      case 3 : obstacle.addImage("snake",snakeImg);
      break;
      case 4 : obstacle.addImage("Jin",jinImg);
      break;
      default : break;
    }
    obstacle.lifetime = 800;
    oGroup.add(obstacle);
  }
  if(frameCount%300 === 0){
    diamond = createSprite(displayWidth,displayHeight-250,1,1);
    diamond.addImage("diamond",diamondImg);
    diamond.scale =0.1;
    diamond.velocityX = -4;
    dGroup.add(diamond);
    diamond.lifetime = 800;
  }
  
  if(oGroup.isTouching(boy)){
    gameState = "RESET";
    
  }
  if(dGroup.isTouching(boy)){
    score = score+100;
    dMusic.play();
    dGroup.destroyEach();
  }
  drawSprites()
}

function end(){
  gameState = "PLAY";
  diamond.destroy();
  obstacle.destroy();
  boy.destroy();
  bg2.addImage("background2",bg2Img);
  drawSprites();
  
}

function reset(){
  background(0);
  reset.addImage("RESET",resetImg);
  path.destroy();
  boy.destroy();
  oGroup.destroyEach();
  dGroup.destroyEach();
  oMusic.play();
  drawSprites();
}
