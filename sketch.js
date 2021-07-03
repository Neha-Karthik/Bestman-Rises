const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var drops = [];
var maxDrops = 100;
var umbrella;
var rand;
var night;
var Thunder, thunder1,thunder2,thunder3,thunder4;
var thunderCreatedFrame = 0;

var batAnimation,bat;


function preload(){
   thunder1 = loadImage("images/thunderbolt/1.png");
   thunder2 = loadImage("images/thunderbolt/2.png");
   thunder3 = loadImage("images/thunderbolt/3.png");
   thunder4 = loadImage("images/thunderbolt/4.png");
   batAnimation = loadAnimation("images/bat/bat1.png","images/bat/bat2.png","images/bat/bat3.png",
                        "images/bat/bat4.png","images/bat/bat5.png","images/bat/bat6.png",
                        "images/bat/bat7.png","images/bat/bat8.png","images/bat/bat9.png",
                        "images/bat/bat10.png","images/bat/bat11.png","images/bat/bat12.png");
}

function setup(){
   var canvas = createCanvas(500, 700);

   engine = Engine.create();
   world = engine.world;

   umbrella = new Umbrella(200,500);

   for(var i = 0; i < maxDrops; i++){
      drops.push(new createDrops(random(0,500), random(0,500)));
   }
}

function draw(){
   Engine.update(engine);
   background("black");

    
   rand = Math.round(random(1,4));
   if(frameCount%80 === 0){
      thunderCreatedFrame = frameCount;
      Thunder = createSprite(random(10,370), random(10,30), 10, 10);
      
      switch(rand){
         case 1: Thunder.addImage(thunder1);
         break;
         case 2: Thunder.addImage(thunder2);
         break; 
         case 3: Thunder.addImage(thunder3);
         break;
         case 4: Thunder.addImage(thunder4);
         break;
         default: break;
      }
        Thunder.scale = 0.7;
      }

      bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    if(frameCount % 100 === 0){
       bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
    }

    if(thunderCreatedFrame + 10 === frameCount && Thunder){
        Thunder.destroy();
    }


   umbrella.display();

   for(var i = 0; i < maxDrops; i++){
      drops[i].display();
      drops[i].update();
  }

   drawSprites();
}   

