var bg,bg_image;
var player,shooter_image,shooter2_image,shooter3_image;
var zombie, zombie_image;
var bullet, bullet_image;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;
var gameState = "fight";
function preload(){
  shooter_image = loadImage("shooter.png");
  shooter2_image = loadImage("shooter2.png");
  bg_image = loadImage("background.png");
  bullet_image = loadImage("bullet.png");
  shooter3_image = loadImage("shooter3.png");
  zombie_image = loadImage("zombie.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bg_image);
  bg.scale = 1.1;

  player = createSprite(displayWidth-750, displayHeight-300, 50, 50);
  player.addImage(shooter_image);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle",0,0,500,500);

  bulletGroup = new Group()
  zombieGroup = new Group()
}

function draw() {
  background(0);  
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  
  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-30
  }
  
  if(keyDown("RIGHT_ARROW")||touches.length>0){
   player.x = player.x+30
  }
  
  if(keyDown("space")){
    bullet = createSprite(displayWidth-750,player.y-30,20,10)
    //bullet.addImage(bullet_image);
    bullet.scale = 0.2;
    bullet.velocityX = 20;
    
    bulletGroup.add(bullet);
    bullet_image.scale = 250;
    player.depth = bullet.depth;
    player.depth = player.depth+2;
    player.addImage(shooter3_image);
    bullets = bullets-1;
  }
  else if(keyWentUp("space")){
    player.addImage(shooter2_image);
    shooter2_image.scale = 0.4;
  }
  
  //go to gameState "bullet" when player runs out of bullets
  if(bullets==0){
    gameState = "bullet";
      
  }
  
  //destroy the zombie when bullet touches it and increase score
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){     
        
     if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          score = score+2
          } 
    
    }
  }
  
  //reduce life and destroy zombie when player touches it
  if(zombieGroup.isTouching(player)){
   
    
   
  
   for(var i=0;i<zombieGroup.length;i++){     
        
    if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy()
        
        life=life-1
         } 
   
   }
  }
  enemy();
  if(life === 0){
    gameState = "lost";
  }
  if(gameState === "lost" && keyCode === 32){
    gameState = "fight";
    bullets = 70;
    lives = 30;
    player = createSprite(displayWidth-750, displayHeight-300, 50, 50);
  player.addImage(shooter_image);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle",0,0,500,500);
  }
  drawSprites();
  textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost!!!!!!!!!!! ",200,400);
  text("Press SpaceKey to restart the game!!!!!!!!!!!",200,650);
  zombieGroup.destroyEach();
  player.destroy();

}
if(gameState === "lost" || keyDown("space")){
  gameState = "fight";
}
//destroy zombie and player and display a message in gameState "won"
else if(gameState === "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState === "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombie_image);
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false;
    zombie.setCollider("rectangle",0,0,500,500)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}