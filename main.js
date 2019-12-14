let inputPlayer1 = document.querySelector('.inputPlayer1');
let inputPlayer2 = document.querySelector('.inputPlayer2');
let playerimage1 = document.querySelector('.playerimage1');
let player2image = document.querySelector('.player2image');
let player1detail = document.querySelector('.player1detail');
let player2detail = document.querySelector('.player2detail');
let weight1 = document.querySelector('.weight1');
let weight2 = document.querySelector('.weight2');
let height1 = document.querySelector('.height1');
let height2 = document.querySelector('.height2');
let abilities1 = document.querySelector('.abilities1');
let abilities2 = document.querySelector('.abilities2');
const span1 = document.getElementsByClassName('none')
const span2 = document.getElementsByClassName('none1')
const winner = document.querySelector('.winner');


let result = document.querySelector('.result')

inputPlayer1.addEventListener('keyup',fetchplayer1);
inputPlayer2.addEventListener('keyup',fetchplayer2);
let firstObj;
let secObj;
let array1 = [];
let array2 = [];
function fetchplayer1(event){
    abilities1.innerHTML = "";
    if(event.keyCode == 13){
        Array.from(span1).forEach(e => e.style.display = 'block')
        let val = fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)
        .then(res => res.json())
        .then(function(data){
            firstObj = data;
            console.log(data.sprites.front_defeault);
            playerimage1.src = data.sprites.front_default;
            player1detail.textContent = data.name.toUpperCase();
            weight1.textContent = data.weight;
            height1.textContent = data.height;
            abilities1.innerText = "Abilities:";
            abilities1.style.color = 'white';
            // abilities1.style.fontWeight = "bolder";
            for(let i = 0;i<data.abilities.length;i++){

                let li = document.createElement('li');
                let p = document.createElement('p');
                p.innerText = data.abilities[i].ability.name;
                p.style.color = 'black';
                li.append(p);
                abilities1.append(li);
            }
            
            
        })
    }
}
function fetchplayer2(event){
    abilities2.innerHTML = '';

    if(event.keyCode == 13){
        Array.from(span2).forEach(e => e.style.display = 'block')
        let val = fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)
        .then(res => res.json())
        .then(function(data){
            secObj = data;
            console.log(data.sprites.front_defeault);
            player2image.src = data.sprites.front_default;
            player2detail.textContent = data.name.toUpperCase();
            weight2.textContent = data.weight;
            height2.textContent = data.height;
            abilities2.innerText = "Abilities";
            abilities2.style.color = 'white';
            for(let i = 0;i<data.abilities.length;i++){

                let li = document.createElement('li');
                let p = document.createElement('p');
                p.innerText = data.abilities[i].ability.name;
                li.append(p);
                p.style.color = 'black';
                abilities2.append(li);
            }
            
            evaluate(firstObj,data);
        })
    }
}
function evaluate(obj1,obj2){
    // console.log(obj1)
    let weightpoints1 = obj1.weight;
    // let movesLength1= obj1.moves.lenght*0.5;
    let baseExp1 = obj1.base_experience;
    // let held_items1 = obj1.held_items;
    let abilitiesScore1 = obj1.abilities.length;
    // console.log(weightpoints1,movesLength1,baseExp1,abilities1);

    let weightpoints2 = obj2.weight;
    // let movesLength2= obj2.moves.lenght*0.5;
    let baseExp2 = obj2.base_experience;
    // let held_items2 = obj2.held_items;
    let abilitiesScore2 = obj2.abilities.length;
    // console.log(weightpoints2,movesLength2,baseExp2,abilities2); 

    if(weightpoints1+baseExp1+abilitiesScore1 > weightpoints2 + baseExp2  + abilitiesScore2)
    // if(weightpoints1>weightpoints2)
    {
        // <span class="result"></span>
        result.textContent =  obj1.name;
    }else{
        result.textContent = obj2.name;
    }
    winner.style.display = 'inline-block';

}