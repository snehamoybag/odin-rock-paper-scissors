// get user choice
function getPlayerChoice() {
  const playerChoice = prompt(
    "Type your answer: 'Rock', 'Paper' or 'Scissors'?"
  );
  const playerChoiceLowerCased = toLowerCase(playerChoice);
  return playerChoiceLowerCased;
}

// get random index of an array
function getRandomArrIndex(arr) {
  // random number from 0 to array's length - 1
  const randomNum = Math.floor(Math.random() * (arr.length - 1) + 1);
  const randomIndex = arr[randomNum];
  return randomIndex;
}

// get computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = getRandomArrIndex(choices);
  return computerChoice;
}

// decide the game, win or lose
// track score of both computer and user
// display the win or lose message on console
// play 5 rounds
// in the last round show the user and computer score
