let levels;
let currentLevel = 0;
let done = false;
let enemy;
let theSprite;
let coin;
let enemyInt;
let firstOver = false;
$.ajax({
    url: './levels/level1.JSON',
    type: 'GET',
    success: (response,status)=>{
        // console.log(response);
        levels = JSON.parse(response);
        done = true;
    }
});


let allCol = document.getElementsByClassName('col');
//col 237 start
let spritePos = 237;

class SpriteInfo{
    constructor(pos,img){
        this.pos = pos;
        this.img = img;
        this.state = 0;
    }
    changeState(){
        if(this.state === this.img.length -1){
            this.state = 0;
        }
        else{
            this.state += 1;
        }
    }
    moveUp(){
        if (this.pos-25>= 0){
            this.pos -= 25;
        }
        this.changeState();
    }
    moveDown(){
        if (this.pos+25 <= 499){
            this.pos += 25;
        }
        this.changeState();
    }
    moveLeft(){
        if (this.pos%25 === 0){
            this.pos += 24;
        }
        else{
            this.pos -= 1;
        }
        this.changeState();
    }
    moveRight(){
        if ((this.pos+1)%25 === 0){
            this.pos -= 24;
        }
        else{
            this.pos += 1;
        }
        this.changeState();
    }
    clearThis(){
        allCol[this.pos].innerHTML = '';
    }
}

function showMessage(message){
    let myModal = document.getElementById('modal');
    myModal.style.display = 'block';
    document.getElementById('gameGrid').style.filter = 'blur(5px)';
    myModal.innerHTML = `<h1>${message}</h1><button onclick="hideMessage()">CLOSE</button>`;
}
function hideMessage(){
    let myModal = document.getElementById('modal');
    myModal.style.display = 'none';
    document.getElementById('gameGrid').style.filter = 'blur(0px)';
    myModal.innerHTML = '';
}

let initial = setInterval(()=>{
    if (done){
        clearInterval(initial);
        console.log('iran');
        enemy = new SpriteInfo(levels.level[currentLevel].enemy,['./sprites/enemy.png','./sprites/enemy2.png']);
        theSprite = new SpriteInfo(levels.level[currentLevel].player,['./sprites/kirbyWalk1.jpg','./sprites/kirbyWalk2.jpg','./sprites/kirbyWalk3.jpg']);
        coin = new SpriteInfo(levels.level[currentLevel].coin,['./sprites/coin1.png','./sprites/coin2.png']);
        draw();
        enemyInt = setInterval(()=>{
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
    }
    // else{
    //     initial();
    // }
},200);
let loadLevel = ()=>{
    // firstOver = true;
    console.log('Load Complete');
    enemy = new SpriteInfo(levels.level[currentLevel].enemy,['./sprites/enemy.png','./sprites/enemy2.png']);
    theSprite = new SpriteInfo(levels.level[currentLevel].player,['./sprites/kirbyWalk1.jpg','./sprites/kirbyWalk2.jpg','./sprites/kirbyWalk3.jpg']);
    coin = new SpriteInfo(levels.level[currentLevel].coin,['./sprites/coin1.png','./sprites/coin2.png']);
    draw();
    enemyInt = setInterval(()=>{
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
        if (enemy.pos === theSprite.pos){
            clearInterval(enemyInt);
        }
        else if(theSprite.pos === coin.pos){
            clearInterval(enemyInt);

        }
    },200);
};

function draw(){
    let allGrid = document.getElementsByClassName('col');
    for(let i = 0; i < allGrid.length; i++){
        allGrid[i].innerHTML = '';
    }
    document.getElementById(`col${enemy.pos}`).innerHTML = `<img src=${enemy.img[enemy.state]} alt="pacman">`;
    if (enemy.pos === theSprite.pos){
        // clearInterval(enemyInt);
        showMessage('GAME OVER');
        enemy.clearThis();
        theSprite.clearThis();
        currentLevel = 0;
        clearInterval(enemyInt);
        loadLevel();
    }
    document.getElementById(`col${theSprite.pos}`).innerHTML = `<img src='${theSprite.img[theSprite.state]}' alt="a circle">`;
    // for (let i = 0; i < allCol.length; i++){
    //     allCol[i].innerHTML = '';
    // }
    document.getElementById(`col${coin.pos}`).innerHTML = `<img src="${coin.img[coin.state]}" alt="a coin">`;
    coin.changeState();
    if(currentLevel === levels.level.length && firstOver === true){
        showMessage('You beat the game!');
        clearInterval(enemyInt);
        currentLevel = 0;
        loadLevel();
        // draw();
    }
    else if (theSprite.pos === coin.pos){
        firstOver = true;
        // clearInterval(enemyInt);
        showMessage('You Beat the Level!');
        currentLevel++;
        coin.clearThis();
        theSprite.clearThis();
        clearInterval(enemyInt);
        loadLevel();
    }
}






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
