
let allCol = document.getElementsByClassName('col');
//col 237 start
let spritePos = 237;

class SpriteInfo{
    constructor(pos,img){
        this.pos = pos;
        this.img = img;
    }
    moveUp(){
        if (this.pos-25>= 0){
            this.pos -= 25;
        }
    }
    moveDown(){
        if (this.pos+25 <= 499){
            this.pos += 25;
        }
    }
    moveLeft(){
        if (this.pos%25 === 0){
            this.pos += 24;
        }
        else{
            this.pos -= 1;
        }
    }
    moveRight(){
        if ((this.pos+1)%25 === 0){
            this.pos -= 24;
        }
        else{
            this.pos += 1;
        }
    }
    clearThis(){
        allCol[this.pos].innerHTML = '';
    }
}
let theSprite = new SpriteInfo(237,'./sprites/circle.png');
let enemy = new SpriteInfo(0,'./sprites/enemy.png');


function draw(){
    document.getElementById(`col${enemy.pos}`).innerHTML = `<img src=${enemy.img} alt="pacman">`;
    if (enemy.pos === theSprite.pos){
        clearInterval(enemyInt);
        alert('GAME OVER');
    }
    document.getElementById(`col${theSprite.pos}`).innerHTML = `<img src='${theSprite.img}' alt="a circle">`;
    // for (let i = 0; i < allCol.length; i++){
    //     allCol[i].innerHTML = '';
    // }
}
draw();

let enemyInt = setInterval(()=>{
//create list of unvisited nodes
    //Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. Set the initial node as current.
    let choice = 0;
    let initial = enemy.pos;
    enemy.moveUp();
    let choiceUp = enemy.pos;
    enemy.pos = initial;
    enemy.moveRight();
    let choiceRight = enemy.pos;
    enemy.pos = initial;
    if (choiceUp - theSprite.pos < 0){
        if (theSprite.pos - choiceUp < Math.abs(theSprite.pos - choiceRight)){
            choice = choiceUp;
        }
        else{
            choice = choiceRight;
        }
    }
    else{
        if (choiceUp - theSprite.pos < choiceRight - theSprite.pos){
            choice = choiceUp;
        }
        else{
            choice = choiceRight;
        }
    }
    enemy.moveDown();
    let choiceDown = enemy.pos;
    enemy.pos = initial;
    if (choiceDown - theSprite.pos < 0){
        if (choiceDown - theSprite.pos < theSprite.pos - choice){
            choice = choiceDown;
        }
    }
    else{
        if (choiceDown - theSprite.pos < choice - theSprite.pos){
            choice = choiceDown;
        }
    }
    enemy.moveLeft();
    let choiceLeft = enemy.pos;
    enemy.pos = initial;
    if (choiceLeft - theSprite.pos < 0){
        if(theSprite.pos - choiceLeft < choice - theSprite.pos){
            choice = choiceLeft;
        }
    }
    else{
        if (choiceLeft - theSprite.pos < choice - theSprite.pos){
            choice = choiceLeft;
        }
    }
    switch(choice){
        case choiceUp:
            enemy.clearThis();
            enemy.moveUp();
            break;
        case choiceLeft:
            enemy.clearThis();
            enemy.moveLeft();
            break;
        case choiceDown:
            enemy.clearThis();
            enemy.moveDown();
            break;
        case choiceRight:
            enemy.clearThis();
            enemy.moveRight();
            break;
    }

    draw();
},200);



document.addEventListener('keydown', (event)=>{
    if(event.keyCode === 87){
        theSprite.clearThis();
        theSprite.moveUp();
        draw();
    }
    else if(event.keyCode === 83){
        theSprite.clearThis();
        theSprite.moveDown();
        draw();
    }
    else if(event.keyCode === 65){
        theSprite.clearThis();
        theSprite.moveLeft();
        draw();
    }
    else if(event.keyCode === 68){
        theSprite.clearThis();
        theSprite.moveRight();
        draw();
    }
});
