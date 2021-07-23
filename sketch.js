var dog;
var database;
var HappyDog;
var dogImg;
var foodS;
var foodObj;
var foodStock;
var lastFed,feed,addFood,fedTime;
var gameState,lazyDog,b_i,g_i,injectionImg,washroomImg;
var currentTime;


function preload()
{
	dogImg =  loadImage("images/Dog.png");
  HappyDog = loadImage("images/Happy.png");
  lazyDog = loadImage("images/Lazy.png");
  washroomImg = loadImage("images/Wash Room.png");
  b_i = loadImage("images/Bed Room.png");
  g_i = loadImage("images/Garden.png");
  injectionImg = loadImage("images/Injection.png");

  deadDog = loadImage("images/deadDog.png");
}

function setup() {
	createCanvas(1000,800);

  dog = createSprite(750,300);
  dog.addImage(dogImg,500,300,20,20);
  dog.scale= 0.20;

  foodObj= new Food();
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
 
  readState = database.ref('gameState');
  readState.on("value", function (data){
     gameState = data.val();
  })
  


  feed  = createButton("Feed the Dog");
  feed.position(700,95);
 

  addFood = createButton("Add Food");
  addFood.position(800,95);
  
}


function draw() { 
  background(46,139,87);
  fill(255);
  text("foodCount : "+foodS,20,20);
 
  curretTime = hour();
  if(currentTime==(lastFed+1)){
     update("playing");
     foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime ==(lastFed+2) && currentTime <=(lastFed+4) ){
    update("bathing");
    foodObj.washroom();
  }
  else{
    update("hungry");
    foodObj.display();
    
  }


 
   
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){

    lastFed = data.val();
  })
  drawSprites();
  addFood.mousePressed(addFoodS)
  feed.mousePressed(feedDog);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
     text("Last Feed : "+lastFed%12+"PM",350,30);
  }
  else if(lastFed>=0){
    text("Last Feed : 12 AM",350, 30);
 }
  else{
    text("Last Feed : "+lastFed+"PM",350,30);
 }
}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){

    x= 0

  } else{
    
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){

  dog.addImage(HappyDog);
 
  var food_stock_val = foodObj.getFoodStock();

  if(food_stock_val<=0){
     foodObj.updateFoodStock(food_stock_val * 0);
  }
  else{
    foodObj.updateFoodStock(food_stock_val -1);

  }
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
  })
}

function addFoodS(){

  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })

}

function update(state){

  database.ref('/').update({
    gameState:state
  })
}


