var balloon, balloonImg;
var database, position;
var bg;

function preload(){
balloonImg = loadImage("pro-C35 images/Hot Air Ballon-02.png");
bg = loadImage("pro-C35 images/Hot Air Ballon-01.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImg)
  var hballoon = database.ref('Balloon/Position');
    hballoon.on("value", readposition, showError)
}

function draw() {
  background(bg); 
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x + 10
}
else if(keyDown(UP_ARROW)){
  balloon.y = balloon.y - 10
  balloon.scale = balloon.scale - 0.01;
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y + 10
  balloon.scale = balloon.scale + 0.01;
} 
  drawSprites();
  textSize(20)
  text("Move the balloon with the arrow keys", 80, 20);
}


function changePosition(x,y){
  database.ref('ball/position').set({
      'x': position.x + x, 
      'y': position.y + y
  })
}

function readposition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in the code")
}