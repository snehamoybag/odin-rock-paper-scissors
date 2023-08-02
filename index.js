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
function hideExtraChips(playerEl, computerEl) {
  const allChips = document.querySelectorAll(".chip");

  function hideOnChipsClose(extraChip) {
    playerEl.parentNode.addEventListener("transitionend", () =>
      extraChip.parentNode.classList.add("hidden")
    );
  }

  allChips.forEach((chip) => {
    if (chip !== playerEl && chip !== computerEl) {
      hideOnChipsClose(chip);
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

// show results
function showRoundResults(playerSelection, computerSelection, result) {
  const resultsEl = document.querySelector("#results");
  const roundNumEl = document.querySelector("#round-number");
  const resultTitleEl = document.querySelector("#result-title");
  const resultDescEl = document.querySelector("#result-description");
  const playerScoreEl = document.querySelector("#player-score");
  const computerScoreEl = document.querySelector("#computer-score");
  const computerChipWrapperEl =
    document.querySelector("#computer-chip").parentNode;

  switch (result) {
    case "win":
      resultTitleEl.textContent = "You Win!";
      resultDescEl.textContent = `${pascalCase(
        playerSelection
      )} beats ${pascalCase(computerSelection)}.`;
      break;
    case "lose":
      resultTitleEl.textContent = "You Lose";
      resultDescEl.textContent = `${pascalCase(
        computerSelection
      )} beats ${pascalCase(playerSelection)}.`;
      break;
    default:
      resultTitleEl.textContent = "It's a Draw!";
      resultDescEl.textContent = `You chose ${pascalCase(
        playerSelection
      )}. Computer too chose the same!`;
  }

  // show results after selected chips are displayed
  computerChipWrapperEl.addEventListener("transitionend", () => {
    setTimeout(() => resultsEl.classList.remove("visually-hidden"), 500);
  });
}

// play a round
function playRound() {
  const allChips = document.querySelectorAll(".chip");
  const playerSelection = this.dataset.chip;
  const playerSelectionEl = this;
  const computerSelection = getRandomSelection();
  const computerSelectionEl = document.querySelector("#computer-chip");
  const result = getRoundResult(playerSelection, computerSelection);
  // remove eventListener from all chip after the first click
  allChips.forEach((chip) => chip.removeEventListener("click", playRound));

  addComputerSelectedElStyles(computerSelection, computerSelectionEl);
  closeAllChips();
  hideExtraChips(playerSelectionEl, computerSelectionEl);
  showSelectedChips(playerSelectionEl, computerSelectionEl);
  showRoundResults(playerSelection, computerSelection, result);
}

// run game with number of times
function game() {
  const allChips = document.querySelectorAll(".chip");

  allChips.forEach((chip) => chip.addEventListener("click", playRound));
}

// run game on page load
game();
