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

// show user choice and computer choice
function showSelections(playerSelection, computerSelection) {
  console.log(
    `You Chose : ${pascalCase(playerSelection)} | `,
    `The Computer Chose : ${pascalCase(computerSelection)}`
  );
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

// add player selected chip styles
// function addPlayerSelectedElStyles(selectionEl) { }

// add computer selected chip styles
function addComputerSelectedElStyles(selection, selectionEl) {
  selectionEl.classList.add(`chip--${selection}`);
  selectionEl.querySelector(".chip__name").textContent = pascalCase(selection);
}

// add choser texts when chosen chips are finished transitioning
function addChoserTexts(playerEl, computerEl) {
  const playerElWrapper = playerEl.parentNode;
  playerElWrapper.addEventListener("transitionend", () => {
    playerEl.previousElementSibling.textContent = "You Chose";
    computerEl.previousElementSibling.textContent = "Computer Chose";
  });
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

// hide non-selected chips
function hideExtraChips(playerEl, ComputerEl) {
  const allChips = document.querySelectorAll(".chip");
  allChips.forEach((chip) => {
    if (chip !== playerEl && chip !== ComputerEl) {
      chip.parentNode.classList.add("hidden");
    }
  });
}

// show player and computer selected chips
function showSelectedChips(playerEl, computerEl) {
  const playerElWrapper = playerEl.parentNode;
  const computerElWrapper = computerEl.parentNode;
  const gameBoard = document.querySelector("#game");

  // after chips are closed
  playerElWrapper.addEventListener("transitionend", () => {
    computerElWrapper.classList.remove("hidden");
    hideExtraChips(playerEl, computerEl);

    setTimeout(() => {
      gameBoard.classList.remove("animate-closing");
      playerElWrapper.classList.add("animate-player-selection");
      computerElWrapper.classList.add("animate-computer-selection");
      addChoserTexts(playerEl, computerEl);
    }, 500 /* 500ms delay */);
  });
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
function showRoundResults(
  result,
  playerSelection,
  computerSelection,
  selectionEl
) {
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

// play a round
function playRound() {
  const allChips = document.querySelectorAll(".chip");
  const playerSelection = this.dataset.chip;
  const playerSelectionEl = this;
  const computerSelection = getRandomSelection();
  const computerSelectionEl = document.querySelector("#computer-chip");
  const result = getRoundResult(playerSelection, computerSelection);

  console.log(this);
  addComputerSelectedElStyles(computerSelection, computerSelectionEl);
  closeAllChips();
  showSelectedChips(playerSelectionEl, computerSelectionEl);
  showRoundResults(
    playerSelection,
    computerSelection,
    result,
    computerSelectionEl
  );
}

// tracks resu0

// run game with number of times
function game() {
  let nthRound = 1;
  playRound();
}

// run game on page load
game();
