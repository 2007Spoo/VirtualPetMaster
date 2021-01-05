var dog,dogImg,dogImg1, happyDog;
var database;
var foodS,foodStock;
var fedTime, lastFed;
var foodObject;
function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(800,500);

  feed= createButton("Feed the Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood= createButton("addFood");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(248,146,164);
 
  //if(keyWentDown(UP_ARROW)){
    //writeStock(foodS);
    //dog.addImage(dogImg1);
  //}

  drawSprites();
  fill(217,28,234);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  //textSize(13);
  //fill(24,80,175)
  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  fill(99,98,158)
  textSize(15)
  if(lastFed>=12)
  {
    text("Last Fed:"+ lastFed%12+ "PM", 420,32);
  }
  else if(lastFed == 0)
  {
    text("Last Feed: 12 AM", 420,32);
  }
  else
  {
    text(" Last Feed :"+ lastFed+ "AM", 420,32);  
  }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

// Function to feed dog

function feedDog()
{
  dog.addImage(happyDog);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObject.getFoodStock(),
      feedTime:hour()
    }
  )
}

//  Function to add food in stock

function addFoods()
{
  foodS++;
  database.ref('/').update(
    {
      Food:foodS
    }
  )
}