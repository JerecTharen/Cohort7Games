
//document element references
let gameText = document.getElementById('gameText');
let btnOne = document.getElementById('firstBTN');
let btnTwo = document.getElementById('secondBTN');
let btnThree = document.getElementById('thirdBTN');
let btnFour = document.getElementById('fourthBTN');
//variable initialization
let currentText = 0;
let questLoad;
let questText;


function loadText(){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url: "./js/questText/questText.JSON",
            type: "GET",
            success: (response,status)=>{
                resolve(response);
            },
            error: (error)=>{
                reject(error);
            }
        });

    });
}

questLoad = loadText();
(async function(){
    questLoad.then(data =>{
        console.log(data);
        questText = JSON.parse(data);
        gameText.innerHTML = questText.characterCreation[currentText];
    });
    btnOne.innerHTML = 'CONTINUE';
    btnOne.setAttribute('onclick','continueText()');
})();

function continueText(){
    // console.log('in function');
    if(currentText !== questText.characterCreation.length - 1){
        currentText++;
    }
    gameText.innerHTML = questText.characterCreation[currentText];
}
