let minValue = 0;
let maxValue = 100;

const random = Math.floor(Math.random() * (maxValue - minValue + 1)); // random startnummer mellan 0 (inklusive 0) och 100 (inklsive 100)
const maxRound = 5;

let playerRoundNumber = 0;
let aiRoundNumber = 0;

let playerNumber = 0;
let aiNumber = 0;


let setGameText = document.querySelector('#guessFromTo').innerHTML = `Guess a number between ${minValue} and ${maxValue}`;

window.onload = () => {
    console.log(random);
    document.querySelector('#playerInput').focus();
    document.querySelector('#guessButton').onclick = function() { guess() };
    document.querySelector('#restartButton').onclick = function() { restartGame() };
    document.querySelector('#testButton').onclick = function() { test() };
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const guess = () => {
    player();
}

const restartGame = () => {
    window.location.reload();
}

const results = (r) => {
    let result = r;
    result === 'winner' ? emoji = '🎉' : emoji = '😔'; // Emojin
    result === 'winner' ? text = 'Winner!' : text = 'AI Win!'; // Texten
    result === 'winner' ? toggle = 'win' : toggle = 'lose'; // Togglar bakrund (css)

    document.querySelector('#gameResult').classList.toggle(toggle);
    document.querySelector('#resultEmoji').innerHTML = emoji;
    document.querySelector('#resultText').innerHTML = text;
    document.querySelector('#resultWinningNumber').innerHTML = `${random}`;
}

const gameEnd = () => {
    document.querySelector('#gameResult').classList.toggle('tie');
    document.querySelector('#resultEmoji').innerHTML = '⏳';
    document.querySelector('#resultText').innerHTML = 'Tie!';
} 

const checkLeft = () => {
    if (playerRoundNumber === maxRound && aiRoundNumber === maxRound) {
        gameEnd();
    }
}

const player = () => {
    let playerInput = document.querySelector('#playerInput').value;
    let playerGuess = parseInt(playerInput);

    playerNumber = playerGuess;

    if (playerRoundNumber !== maxRound && playerGuess === random) {
        results('winner');
    } else if (playerRoundNumber !== maxRound && playerGuess < maxValue && playerGuess > random) {
        maxValue = playerGuess;
        playerRoundNumber++
        checkLeft();
        addToPlayerGuesses('LOWER', playerGuess);
        console.log(playerRoundNumber);
        setTimeout(function(){
            ai(playerNumber);
        }, 2000);
        return;
    } else if (playerRoundNumber !== maxRound && playerGuess > minValue && playerGuess < random) {
        minValue = playerGuess;
        playerRoundNumber++
        checkLeft();
        addToPlayerGuesses('HIGHER', playerGuess);
        console.log(playerRoundNumber);
        setTimeout(function(){
            ai(playerNumber);
        }, 2000);
        return;
    } else if (playerRoundNumber === maxRound) {
        gameEnd();
    } else {
        return;
    }
}

const ai = (playerNumber) => {

    let aiGuess = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    
    aiNumber = aiGuess;

    if (aiRoundNumber !== maxRound && aiGuess === random) {
        results('loser');
    } else if (aiRoundNumber !== maxRound && aiGuess < maxValue && aiGuess > random) {
        maxValue = aiGuess;
        aiRoundNumber++
        checkLeft();
        addToAIGuesses('LOWER', aiGuess);
        console.log(aiRoundNumber);
        return;
    } else if (aiRoundNumber !== maxRound && aiGuess > minValue && aiGuess < random) {
        minValue = aiGuess;
        aiRoundNumber++
        checkLeft();
        addToAIGuesses('HIGHER', aiGuess);
        console.log(aiRoundNumber);
        return;
    } else if (aiRoundNumber === maxRound) {
        gameEnd();
    } else if (aiGuess === playerNumber) {
        aiRoundNumber--
        ai(playerNumber);
        return;
    } else {
        console.log('Something went wrong :(');
        return;
    }
}

function addToPlayerGuesses(state, guessedNumber) {
    document.querySelector('#hint').innerHTML = `The number is ${state} than ${guessedNumber}.`;
    let ul = document.querySelector('#playerGuesses');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(guessedNumber)); 
    ul.appendChild(li); 
    document.querySelector('#guessFromTo').innerHTML = `Guess a number between ${minValue} and ${maxValue}`;
    document.querySelector('#guessButton').disabled = true;
    document.querySelector('#guessButton').innerHTML = "AI´s Turn";
}

function addToAIGuesses(state, guessedNumber) { 
    document.querySelector('#hint').innerHTML = `The number is ${state} than ${guessedNumber}.`;
    let ul = document.querySelector('#aiGuesses'); 
    let li = document.createElement('li'); 
    li.appendChild(document.createTextNode(guessedNumber)); 
    ul.appendChild(li);
    document.querySelector('#guessFromTo').innerHTML = `Guess a number between ${minValue} and ${maxValue}`;
    document.querySelector('#guessButton').innerHTML = "Guess";
    document.querySelector('#guessButton').disabled = false;
}