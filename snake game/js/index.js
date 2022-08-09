let direction = {x:0, y:0};
let foodsound = new Audio('food.mp3');
let gameoversound = new Audio('gameover.mp3');
let movesound = new Audio('move.mp3');
let musicsound = new Audio('music.mp3');
let lastpaintime = 0;
let score=0;
let speed = 7;
let snakearr = [
    {x: 13,y: 15}
]
food = {x: 6,y: 7};

function main(ctime){
window.requestAnimationFrame(main);
console.log(ctime);
if((ctime-lastpaintime)/1000 < 1/speed){
    return;
}
lastpaintime = ctime;
gameEngine();
}


function isCollide(snake){
for(let i=1;i<snakearr.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
}
if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
return true;
}

}



function gameEngine(){
    if(isCollide(snakearr)){

        gameoversound.play();
        musicsound.pause();
        inputDir = {x:0 , y:0};
        alert('GAME OVER, Press OK to play again!')
        snakearr = [{x:13, y:15}];
        // musicsound.play();
        score = 0;
    }

    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        let a = 2;
        let b = 16; 
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for(let i=snakearr.length-2; i>=0; i--){
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


board.innerHTML = "";
snakearr.forEach((e,index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add('snake');
    if(index === 0){
        snakeElement.classList.add('head');
    }
    board.appendChild(snakeElement);
})

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic
// musicsound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDir = {x:0, y:1}
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break; 
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x= 1;
            inputDir.y= 0;
            break;

    
        default:
            break;
    }
})
 