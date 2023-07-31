// TODO

// update getPlayerSelection function
// 1. add event listeners to all the chips
// 2. clicking any button will trigger closing animation
// 3. remove click event from all the all the button
// 4. return the clicked elements id as the playerSelection from the function

// when all chips are in center, generate computer choice
// remove the extra chip
// move the player selection to left
// move the computer selection to right

// generate result
// after few miliseconds
// display the winner chip effect and round results and scores

// play next round button will animate 2 buttons to close
// will start new round with 3 chips

// a popup will be shown at the end of 5th round
// with game result
// and a button to play a new game

// uppercase the first letter of a word
function pascalCase(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

// get random selection
function getRandomSelection() {
  const choices = ["rock", "paper", "scissors"];
  const randomNum = Math.floor(Math.random() * choices.length - 1) + 1;
  const randomChoice = choices[randomNum];
  return randomChoice;
}

// check if user typed input is valid
function validatePlayerSelection(playerSelection) {
  let isValid;
  switch (playerSelection) {
    case "rock":
    case "paper":
    case "scissors":
      isValid = true;
      break;
    default:
      isValid = false;
  }

  return isValid;
}

// show user choice and computer choice
function showSelections(playerSelection, computerSelection) {
  console.log(
    `You Chose : ${pascalCase(playerSelection)} | `,
    `The Computer Chose : ${pascalCase(computerSelection)}`
  );
}

// get a rounds result
function getRoundResult(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "draw";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

// show a rounds results
function showRoundResults(result, playerSelection, computerSelection) {
  let message;

  if (result === "win") {
    message = `You Win! ${pascalCase(playerSelection)} beats ${pascalCase(
      computerSelection
    )}`;
  } else if (result === "lose") {
    message = `You Lose! ${pascalCase(computerSelection)} beats ${pascalCase(
      playerSelection
    )}`;
  } else {
    message = "It is a Draw!";
  }

  console.log(message);
}

// show error message
function showError(bool) {
  if (!bool) {
    alert("Error: Invalid input! Please type either Rock, Paper or Scissors.");
    console.log("Round ended Abruptly :(");
  }
}

// show scores of player and comouter
function showScores(playerScore, computerScore) {
  console.log(
    `Your Score : ${playerScore} | `,
    `The Computer' Score : ${computerScore}`
  );
}

// show end game message
function showEndGameMessage(playerScore, computerScore) {
  let message;

  if (playerScore === computerScore) {
    message = "The Game ends in a Draw!";
  } else if (playerScore > computerScore) {
    message = "Congratulations! You Win the Game";
  } else {
    message = "You Lose! Computer Wins the Game";
  }

  console.log(message);
}

// animate chips closing
function closeAllChips(transitioningEl) {
  const gameBoard = document.querySelector("#game");

  if (transitioningEl) {
    transitioningEl.addEventListener("transitionend", () => {
      gameBoard.classList.add("animate-closing");
    });
  } else {
    gameBoard.classList.add("animate-closing");
  }
}

// show player and computer selected chips
function showSelectedChips(playerEl, computerEl) {
  const playerElWrapper = playerEl.parentNode;
  const computerElWrapper = computerEl.parentNode;
  const gameBoard = document.querySelector("#game");

  playerElWrapper.addEventListener("transitionend", () => {
    setTimeout(() => {
      gameBoard.classList.remove("animate-closing");
      playerElWrapper.classList.add("animate-player-selection");
      computerElWrapper.classList.add("animate-computer-selection");
    }, 500 /* ms */);
  });
}

// play a round
function playRound() {
  const allChips = document.querySelectorAll(".chip");
  const playerSelection = this.dataset.chip;
  const playerSelectionEl = this;
  const computerSelection = getRandomSelection();
  const computerSelectionEl = document.querySelector(
    `[data-chip=${computerSelection}]`
  );

  // remove eventListener from all chip after the first click
  allChips.forEach((chip) => chip.removeEventListener("click", playRound));
  closeAllChips();
}

// run game with number of times
function game() {
  const allChips = document.querySelectorAll(".chip");

  allChips.forEach((chip) => chip.addEventListener("click", playRound));
}

// run game on page load
game();
