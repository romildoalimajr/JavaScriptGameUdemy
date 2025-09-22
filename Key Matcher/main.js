const circle = document.getElementById("circle");
const letterSpan = document.getElementById("letter");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let currentLetter = getRandomLetter(null);
letterSpan.textContent = currentLetter
;
function getRandomLetter(previous){
    let newLetter;

    do{
        newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    }while (newLetter === previous);

    return newLetter;
}

function flashColor(className){
    circle.classList.remove("correct", "incorrect");
    circle.classList.add(className);

    setTimeout( () => {
        circle.classList.remove(className);
    }, 500);
}

function handleKeyPress(key){
    key = key.toLowerCase();

    if(!key.match(/^[a-z]$/)){
        flashColor("incorrect")   ;
        return;
    }

    if(key === currentLetter.toLowerCase()){
        flashColor("correct");
        const newLetter = getRandomLetter(currentLetter);
        currentLetter = newLetter;
        letterSpan.textContent = currentLetter;
    }else{
        flashColor("incorrect");
    }
}

document.addEventListener("keydown", (e) => {
    handleKeyPress(e.key);
})