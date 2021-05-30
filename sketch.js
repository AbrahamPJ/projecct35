var ball,database;



function preload(){
  bg = loadImage("cityImage.png");
  ball1 = loadAnimation("hotairballoon1.png","hotairballoon1.png")
  ball2 = loadAnimation("hotairballoon2.png","hotairballoon2.png")
 }


function setup(){
    database=firebase.database();
    createCanvas(800,800);
    ball = createSprite(250,250,10,10);
    ball.addAnimation("balloon",ball1);
    ball.shapeColor = "red";
    var ballPosition = database.ref('ball/position');
    ballPosition.on("value",readPosition,showError);

}



function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
        ball.addAnimation("balloon",ball2);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
        ball.addAnimation("balloon",ball2);

    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        ball.addAnimation("balloon",ball2);
        ball.scale = ball.scale+0.05;

    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        ball.addAnimation("balloon",ball2);
        ball.scale = ball.scale-0.05;

    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
'x':position.x+x,
'y':position.y+y
    })
}
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}
function showError(){
console.log("error in writing the database");
}