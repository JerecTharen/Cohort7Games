
import {dmgCalc} from "./module2.js";


class Player {
    constructor(health, gold, inventory) {
        this.health = health;
        this.gold = gold;
        this.inventory = inventory
    }

    boughtDrink(gold) {
        if (this.gold >= 10) {
            this.gold -= 10;
            this.inventory.food.push('lager');
        } else {
            // display 'looks like you're short on funds' to the dom
            console.log('you are broke');
        }
    }

    sleep(health, gold) {
        if (this.gold >= 20) {
            this.health += 20;
            this.gold -= 20;
            // display something that says that the player is now well rested
        }
    }

    boughtFood(health, gold) {
        if (this.gold >= 10) {
            this.gold -= 10;
            this.inventory.food.push('slice of ham');
        }
    }
}



let mainQuest = () => {
    console.log('a gang of bandits has taken over the kings road I theres gold to be had if you can do that ');
    // display a quest to the dom
    console.log('do you accept');
    // here is where the player would accept or decline
};

(function(){
    document.getElementById('firstBTN').setAttribute('onclick', 'practiceModule2()');
    document.getElementById('firstBTN').innerHTML = 'CALC DAMAGE';
    document.getElementById('gameText').innerHTML = 'A monster swings his mace at you.';
})();

window.practiceModule2 = ()=>{
    let attack = dmgCalc(5,6);
    let text = `The monster does ${attack} damage with his mace.`;
    document.getElementById('gameText').innerHTML = text;
};

let myLet = 5;
console.log(myLet);
