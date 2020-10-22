var viper, kaboona, healthKaboona=100, healthViper=100, gameState=0, viperAttack, viperWalk, startButton, startButtonImg;
var backgroundImg, warImg, war, kaboonaWalk, kaboonaAttack, kaboonaDeathImg, kaboonaDeath, viperAttackExtra, kaboonaAttackExtra;
var side1, side2, side3, side4, flag=0, winImg, win, viperDeath, gameOver, gameOverImg, restartButton, restartButtonImg;

function preload(){
  viperAttack=loadAnimation("HeroImages/walk_attack3.png","HeroImages/walk_attack4.png","HeroImages/walk_attack5.png");
  viperWalk=loadAnimation("HeroImages/walk1.png","HeroImages/walk2.png","HeroImages/walk3.png","HeroImages/walk4.png","HeroImages/walk5.png","HeroImages/walk6.png");
  viperAttackExtra=loadAnimation("HeroImages/attack_extra1.png","HeroImages/attack_extra2.png","HeroImages/attack_extra3.png","HeroImages/attack_extra4.png","HeroImages/attack_extra5.png","HeroImages/attack_extra6.png","HeroImages/attack_extra7.png","HeroImages/attack_extra8.png","HeroImages/attack_extra9.png","HeroImages/attack_extra10.png","HeroImages/attack_extra11.png","HeroImages/attack_extra12.png");
  viperDeath=loadImage("HeroImages/death5.png");

  kaboonaWalk=loadAnimation("VillainImg/walk1.png","VillainImg/walk2.png","VillainImg/walk3.png","VillainImg/walk4.png","VillainImg/walk5.png","VillainImg/walk6.png");
  kaboonaAttack=loadAnimation("VillainImg/walk_attack1.png","VillainImg/walk_attack2.png","VillainImg/walk_attack3.png","VillainImg/walk_attack4.png","VillainImg/walk_attack5.png","VillainImg/walk_attack6.png");
  kaboonaDeathImg=loadAnimation("VillainImg/death1.png","VillainImg/death2.png","VillainImg/death3.png","VillainImg/death4.png","VillainImg/death5.png");
  kaboonaDeath=loadImage("VillainImg/death5.png");
  kaboonaAttackExtra=loadAnimation("VillainImg/attack_extra1.png","VillainImg/attack_extra2.png","VillainImg/attack_extra3.png","VillainImg/attack_extra4.png","VillainImg/attack_extra5.png","VillainImg/attack_extra6.png","VillainImg/attack_extra7.png","VillainImg/attack_extra8.png",);

  startButtonImg=loadImage("startbutton.png");
  backgroundImg=loadImage("background.jpg");
  warImg=loadImage("War.png");
  winImg=loadImage("win.png");
  gameOverImg=loadImage("gameOver.png");
  restartButtonImg=loadImage("restart.png")

}

function setup() {
  createCanvas(1536,754);
  viper = new Player();
  kaboona = new AI();

  startButton=createSprite(width/2,height/2+200,10,10);
  startButton.addImage(startButtonImg);
  startButton.scale=0.6;

  restartButton=createSprite(width/2,height/2+300,10,10);
  restartButton.addImage(restartButtonImg);
  restartButton.scale=0.4;

  war = createSprite(width/2, height/2-100,10,10);
  war.addImage(warImg);

  gameOver=createSprite(width/2, height/2-150,10,10);
  gameOver.addImage(gameOverImg);

  side1=createSprite(770,440,1140,10);
  side2=createSprite(1250,545,10,205);
  side3=createSprite(200,545,10,205);
  side4=createSprite(770,650,1140,10);

  win=createSprite(width/2,250,10,10)
  win.addImage(winImg);
  win.scale=1.5;

}
//Ninja storm

function draw() {
  background(backgroundImg);

  side1.visible=false;
  side2.visible=false;
  side3.visible=false;
  side4.visible=false;

  if(gameState===0){
    
    viper.sprite.visible=false;
    kaboona.sprite.visible=false;
    win.visible=false;
    gameOver.visible=false;
    war.visible=true;
    restartButton.visible=false;

    if(mousePressedOver(startButton)){
      gameState=1;
    }
  }

  //text(mouseX+":"+mouseY,mouseX,mouseY);

if(gameState===1){

  noFill();
  stroke("black");
  strokeWeight(2);
  rect(400,90,103,10);
  win.visible=false;

  rect(360,130,103,10);

  //health for viper
  for(var i=0; i<healthViper; i++){
     if(healthViper>75){
      stroke("green");
    }
    else if(healthViper<=75 && healthViper>50){
      stroke("yellow");
    }
    else if(healthViper<=50 && healthViper>25){
      stroke("orange");
    }
    else{
      stroke("red");
    }
    rect(362+i,131,1,7);
  }

  //health for kaboona
  for(var i=0; i<healthKaboona; i++){
    
    if(healthKaboona>75){
      stroke("green");
    }
    else if(healthKaboona<=75 && healthKaboona>50){
      stroke("yellow");
    }
    else if(healthKaboona<=50 && healthKaboona>25){
      stroke("orange");
    }
    else{
      stroke("red");
    }
    rect(402+i,91,1,7);
  }

  startButton.visible=false;
  viper.sprite.visible=true;
  kaboona.sprite.visible=true;
  war.visible=false;
  viper.control();
  kaboona.control();

  viper.sprite.collide(side1);
  viper.sprite.collide(side2);
  viper.sprite.collide(side3);
  viper.sprite.collide(side4);

  stroke("green");
  fill("green");
  textSize(20);
  text("Kaboona: ",300,100);

  textSize(20);
  text("Viper: ",300,140);

  if(healthKaboona<=0){
    healthKaboona=0;
  }

  if(healthViper<=0){
    healthViper=0;
  }

  if(healthKaboona<=0 && healthViper>0){
    gameState=2;
  }
  else if(healthKaboona>0 && healthViper<=0){
    gameState=3;
  }

  //Viper moves
  if(keyIsDown(32) && kaboona.sprite.x-viper.sprite.x<170 && viper.sprite.y-kaboona.sprite.y===0 && World.frameCount%60===0){
    healthKaboona=healthKaboona-5;
    viper.sprite.changeAnimation("attack",viperAttack);
  }

  if(keyWentUp(32)){
    viper.sprite.changeAnimation("walk",viperWalk);
  }

  if(keyIsDown(69) && kaboona.sprite.x-viper.sprite.x<170 && viper.sprite.y-kaboona.sprite.y===0 && World.frameCount%150===0){
  healthKaboona=healthKaboona-20;
  viper.sprite.changeAnimation("attackExtra",viperAttackExtra);
  }

  if(keyWentUp(69)){
    viper.sprite.changeAnimation("walk",viperWalk);
  }

  //kaboona moves
  if(kaboona.sprite.x-viper.sprite.x<50 && viper.sprite.y-kaboona.sprite.y===0 && World.frameCount%100===0){
  healthViper=healthViper-5;
  kaboona.sprite.changeAnimation("attack",kaboonaAttack);
  }

  if(kaboona.sprite.x-viper.sprite.x<40 && viper.sprite.y-kaboona.sprite.y===0 && World.frameCount%250===0){
  healthViper=healthViper-10;
  kaboona.sprite.changeAnimation("attackExtra",kaboonaAttackExtra);
  }

  if(kaboona.sprite.x-viper.sprite.x>100 && viper.sprite.y-kaboona.sprite.y===0){
    kaboona.sprite.changeAnimation("walk",kaboonaWalk);
    }

}

if(gameState===2){
  viper.sprite.visible=false;
  restartButton.visible=true;
  if(mousePressedOver(restartButton)){
    reset();
  }

  if(flag===0){
  kaboona.sprite.changeAnimation("death",kaboonaDeathImg);
}
  flag=1;
  kaboona.sprite.changeAnimation("finalDeath",kaboonaDeath);
  win.visible=true;
}

if(gameState===3){
  kaboona.sprite.visible=false;
  viper.sprite.changeAnimation("death",viperDeath);
  gameOver.visible=true;
  restartButton.visible=true;
  if(mousePressedOver(restartButton)){
    reset();
  }
}

console.log("width "+width+" height"+height);

  drawSprites();
}

function reset(){
  gameState=1;
  gameOver.visible=false;
  win.visible=false;
  restartButton.visible=false;
  kaboona.sprite.visible=true;
  healthViper=100;
  healthKaboona=100;
  viper.sprite.changeAnimation("walk",viperWalk);
  kaboona.sprite.x=width/2+100;
  kaboona.sprite.y=height/2+125;
  viper.sprite.x=width/2-100;
  viper.sprite.y=height/2+125
}