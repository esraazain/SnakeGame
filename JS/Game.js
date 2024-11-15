const canvas =document.getElementById('Game');
const ctx =canvas.getContext('2d');

class SnakePart{
 constructor(x, y){
    this.x= x;
    this.y= y;
 }

}
let speed=7;

let tileCount= 20;
let tileZise= canvas.width / tileCount - 2;
let headX= 10;
let headY= 10;
const snakePart= [];
let tailLenght= 2;

let xVelocity= 0;
let yVelocity= 0;


let appleX= 5;
let appleY= 5;

let score= 0;

const eatSound= new Audio("../Audio/Human Eat Celery 3 - QuickSounds.com.mp3");
const gameOverSound= new Audio("../Audio/Game Over (Super Mario) - QuickSounds.com.mp3");

//game loop
function drowGame(){

 changeSnakePosition();
 let result = isGameOver();
 if(result){
    
    return;
    
 }

 clearScreen();

 checkAppleCollision();
 drowApple();
 drowSnake();

 drowScore();

 if(score > 2){
    speed= 11;
 }

 if(score > 5){
    speed= 15;
 }

setTimeout(drowGame, 1000/ speed); 
}

function isGameOver(){
let gameOver = false;

if(yVelocity ===0 && xVelocity ===0){
    return false;
}

//walls
if(headX < 0 ){
    gameOver= true;
    
}

else if(headX >= tileCount ){
    gameOver= true;
    
}


else if(headY < 0 ){
    gameOver= true;
    
}

else if(headY >= tileCount ){
    gameOver= true;
    
}

for(let i=0; i< snakePart.length; i++)
    {
       let part = snakePart[i];
       if(part.x === headX && part.y === headY){
        gameOver=true;
        
        break;
       }
    }

if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    gameOverSound.play();
  }




return gameOver;




}


function drowScore(){
ctx.fillStyle ="white";
ctx.font = "10px Verdana";
ctx.fillText("Score " + score, canvas.width-50, 10);

}


function drowSnake(){
//  ctx.fillStyle='Red';
//  ctx.fillRect(headX* tileCount, headY* tileCount, tileZise, tileZise);

 ctx.fillStyle='gray';
 for(let i=0; i< snakePart.length; i++)
 {
    let part = snakePart[i];
    ctx.fillRect(part.x *tileCount, part.y* tileCount, tileZise, tileZise);
 }

 snakePart.push(new SnakePart(headX,headY)); //put an item at the end of the head
 while(snakePart.length > tailLenght){
    snakePart.shift(); //remove the further item from the snak parts if have more than our tail
 }

 ctx.fillStyle='Red';
 ctx.fillRect(headX* tileCount, headY* tileCount, tileZise, tileZise);



}



function clearScreen(){

ctx.fillStyle='black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


}


function checkAppleCollision(){
if(appleX === headX && appleY ==headY){
    appleX =Math.floor(Math.random() * tileCount);
    appleY =Math.floor(Math.random() * tileCount);
    tailLenght++;
    score++;
    eatSound.play();
}


}

function drowApple(){

    ctx.fillStyle='green';
    ctx.fillRect(appleX *tileCount, appleY *tileCount, tileZise, tileZise);
}

function changeSnakePosition(){

headX = headX + xVelocity;
headY = headY + yVelocity;

}
document.body.addEventListener("keydown", keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
         return;   
        yVelocity= -1;
        xVelocity= 0;
    }

    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
            return; 
        yVelocity= 1;
        xVelocity= 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity= 0;
        xVelocity= -1;
    }

    //right
    if(event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity= 0;
        xVelocity= 1;
}

}







drowGame();