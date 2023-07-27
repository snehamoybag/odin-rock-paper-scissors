// get user choice
function getPlayerChoice() {
  const playerChoice = prompt(
    "Type your answer: 'Rock', 'Paper' or 'Scissors'?"
  );
  const playerChoiceLowerCased = playerChoice.toLowerCase();
  return playerChoiceLowerCased.trim(); // remove whitenspace from both ends
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

// upper case the first letter
function upperCaseFirstLetter(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

// show user the user and computer choice in console
// with first letter upper cased
function showChoices(playerChoice, ComputerChoice) {
  console.log(
    "You Chose: " + upperCaseFirstLetter(playerChoice),
    "Computer Chose: " + upperCaseFirstLetter(ComputerChoice)
  );
}
// decide the game, win or lose
function getResult(playerChoice, computerChoice) {
  let result;

  if (playerChoice === computerChoice) {
    result = "draw";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "win";
  } else {
    result = "lose";
  }

  return result;
}

// get round score
function getRoundScore(result) {
  let score;
  switch (result) {
    case "win":
      score = 1;
      break;
    case "lose":
      score = -1;
      break;
    default:
      score = 0;
  }

  return score;
}

// display the win or lose message on console
function showResultMesaage(result, playerChoice, computerChoice) {
  let message;

  switch (result) {
    case "win":
      message = `You Win! ${upperCaseFirstLetter(
        playerChoice
      )} beats ${upperCaseFirstLetter(computerChoice)}.`;
      break;
    case "lose":
      message = `You Lose! ${upperCaseFirstLetter(
        computerChoice
      )} beats ${upperCaseFirstLetter(playerChoice)}.`;
      break;
    default:
      message = "It is a Draw!";
  }
  console.log(message);
}

// play a round
function playRound(playerChoice, computerChoice) {
  const result = getResult(playerChoice, computerChoice);
  const roundScore = getRoundScore(result);

  showChoices(playerChoice, computerChoice);
  showResultMesaage(result, playerChoice, computerChoice);

  return roundScore;
}

// play 5 round game
function game() {
  let totalScore = 0;
  for (let i = 1; i <= 5; i++) {
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    totalScore += playRound(playerChoice, computerChoice);
  }

  console.log("Your Score: " + totalScore);
}

// run game
game();
