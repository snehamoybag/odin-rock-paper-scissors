// uppercase the first letter of a word
function pascalCase(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

// get random selection
function getComputerSelection() {
  const choices = ["rock", "paper", "scissors"];
  const randomNum = Math.floor(Math.random() * choices.length - 1) + 1;
  const randomChoice = choices[randomNum];
  return randomChoice;
}

// add styles to computer chip element based on computer choice
function addComputerElStyles(selection, selectionEl) {
  const chipNameEl = selectionEl.querySelector(".chip__name");
  selectionEl.classList.add(`chip--${selection}`);
  chipNameEl.textContent = selection;
}

// hide non-selected extra chips
function hideExtraChips(playerSelectedEl, computerSelectedEl, allChips) {
  allChips.forEach((chip) => {
    if (chip !== playerSelectedEl && chip !== computerSelectedEl) {
      chip.parentNode.classList.add("hidden");
    }
  });
}

// add choser texts above selected chips
function addChoserTexts(playerElWrapper, computerElWrapper) {
  const playerTextEl = playerElWrapper.querySelector(".chip .chip__choser-txt");
  const computerTextEl = computerElWrapper.querySelector(
    ".chip .chip__choser-txt"
  );

  playerElWrapper.addEventListener("transitionend", () => {
    playerTextEl.textContent = "You Chose";
    computerTextEl.textContent = "Computer Chose";
  });
}

// animate selected chips opening after some delay
function animateSelectedChipsOpen(playerElWrapper, computerElWrapper, board) {
  setTimeout(() => {
    board.classList.remove("animate-closing");
    playerElWrapper.classList.add("animate-player-selection");
    computerElWrapper.classList.add("animate-computer-selection");
  }, 500 /* delay */);

  addChoserTexts(playerElWrapper, computerElWrapper);
}

// show player and computer selected chips on DOM
function showSelectedChips(playerSelectedEl, computerSelectedEl, allChips) {
  const board = document.querySelector("#game-board");
  const playerElWrapper = playerSelectedEl.parentNode;
  const computerElWrapper = computerSelectedEl.parentNode;
  // close all chip (move to center)
  board.classList.add("animate-closing");

  // when chips are finished closing (are in center)
  playerElWrapper.addEventListener("transitionend", () => {
    hideExtraChips(playerSelectedEl, computerSelectedEl, allChips);
    computerElWrapper.classList.remove("hidden");
    animateSelectedChipsOpen(playerElWrapper, computerElWrapper, board);
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

// play a 5 round game
function game() {
  const allChips = document.querySelectorAll(".chip");
  const computerSelectedEl = document.querySelector("#computer-chip");

  function playRound() {
    // remove click event from all chips after the fitst click
    allChips.forEach((chip) => chip.removeEventListener("click", playRound));

    const playerSelection = this.dataset.chip;
    const playerSelectedEl = this;
    const computerSelection = getComputerSelection();

    playerSelectedEl.parentNode.classList.add("on-top");
    addComputerElStyles(computerSelection, computerSelectedEl);

    showSelectedChips(playerSelectedEl, computerSelectedEl, allChips);
    // after few milisecs show winner effects with round results
    // play next round button will animate selected chips closing
    // while closing winner chip will be on top
    // when selected chips are on center, remove computer
    // hide computer chip element and remove all the its previous round styles
    // animate open of all default chips
    // when they are on their positon, re add click events that starts a new round
  }

  // add click event to all chip
  allChips.forEach((chip) => chip.addEventListener("click", playRound));
}

game();
