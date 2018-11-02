
let show = false;
function togglePlayerInfo(){
    if (show === false){
        document.getElementById('showPI').style.display = 'block';
        show = true;
    }
    else{
        document.getElementById('showPI').style.display = 'none';
        show = false;
    }
}
