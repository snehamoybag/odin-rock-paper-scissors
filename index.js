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
function addComputerElStyles(computerSelection, computerSelectionEl) {
  const chipNameEl = computerSelectionEl.querySelector(".chip__name");
  computerSelectionEl.classList.add(`chip--${computerSelection}`);
  chipNameEl.textContent = computerSelection;
}

// remove computer styles from previous round
function removeComputerElStyles(computerSelectionEl) {
  const chipNameEl = computerSelectionEl.querySelector(".chip__name");
  computerSelectionEl.classList.remove(
    "chip--rock",
    "chip--paper",
    "chip--scissors"
  );
  chipNameEl.textContent = "";
}

// hide non-selected extra chips
function hideExtraChips(playerSelectedEl, computerSelectedEl, allChips) {
  allChips.forEach((chip) => {
    if (chip !== playerSelectedEl && chip !== computerSelectedEl) {
      chip.parentNode.classList.add("hidden");
    }
  });
}

// regenerate extra chips
function regenExtraChips(computerSelectedEl) {
  const allChips = document.querySelectorAll(".chip");
  allChips.forEach((chip) => {
    if (chip !== computerSelectedEl) {
      chip.parentNode.classList.remove("hidden");
    }
  });
}

// add choser texts above selected chips
function addChoserTexts(playerElWrapper, computerElWrapper) {
  const playerTextEl = playerElWrapper.querySelector(".chip .chip__choser-txt");
  const computerTextEl = computerElWrapper.querySelector(
    ".chip .chip__choser-txt"
  );

  playerElWrapper.addEventListener(
    "transitionend",
    () => {
      playerTextEl.textContent = "You Chose";
      computerTextEl.textContent = "Computer Chose";
    },
    { once: true }
  );
}

// remove choser texts above selected chips
function removeChoserTexts(playerSelectedEl, computerSelectedEl) {
  const playerTextEl = playerSelectedEl.querySelector(".chip__choser-txt");
  const computerTextEl = computerSelectedEl.querySelector(".chip__choser-txt");
  playerTextEl.textContent = "";
  computerTextEl.textContent = "";
}

// animate the opening of default chips
function animateDefaultChipsOpen(playerElWrapper) {
  const board = document.querySelector("#game-board");
  setTimeout(() => {
    board.classList.remove("animate-closing");
  }, 500);
  // remove on-top class after default chips are finished opening
  playerElWrapper.addEventListener(
    "transitionend",
    () => {
      playerElWrapper.classList.remove("on-top");
    },
    { once: true }
  );
}

// animate selected chips opening after some delay
function animateSelectedChipsOpen(playerElWrapper, computerElWrapper) {
  const board = document.querySelector("#game-board");
  setTimeout(() => {
    board.classList.remove("animate-closing");
    playerElWrapper.classList.add("animate-player-selection");
    computerElWrapper.classList.add("animate-computer-selection");
  }, 500 /* delay */);
  // show text above chips after selected chips have finished opening
  addChoserTexts(playerElWrapper, computerElWrapper);
}

// animate selected chips close
function animateSelectedChipsClose(playerElWrapper, computerElWrapper) {
  const board = document.querySelector("#game-board");
  board.classList.add("animate-closing");
  playerElWrapper.classList.remove("animate-player-selection");
  computerElWrapper.classList.remove("animate-computer-selection");
}

// hide default chips and show player and computer selected chips on DOM
function showSelectedChips(playerSelectedEl, computerSelectedEl, allChips) {
  const board = document.querySelector("#game-board");
  const playerElWrapper = playerSelectedEl.parentNode;
  const computerElWrapper = computerSelectedEl.parentNode;
  // close all chip (move to center)
  board.classList.add("animate-closing");

  // when chips are finished closing (are in center)
  playerElWrapper.addEventListener(
    "transitionend",
    () => {
      hideExtraChips(playerSelectedEl, computerSelectedEl, allChips);
      computerElWrapper.classList.remove("hidden");
      animateSelectedChipsOpen(playerElWrapper, computerElWrapper);
    },
    { once: true }
  );
}

// hide selected chips and show default chips
function showDefaultChips(playerSelectedEl, computerSelectedEl) {
  const playerElWrapper = playerSelectedEl.parentNode;
  const computerElWrapper = computerSelectedEl.parentNode;
  removeChoserTexts(playerSelectedEl, computerSelectedEl);
  animateSelectedChipsClose(playerElWrapper, computerElWrapper);

  playerElWrapper.addEventListener(
    "transitionend",
    () => {
      removeComputerElStyles(computerSelectedEl);
      computerElWrapper.classList.add("hidden");
      regenExtraChips(computerSelectedEl);
      animateDefaultChipsOpen(playerElWrapper);
    },
    { once: true }
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
    const nextRoundBtn = document.querySelector("#play-next-round");

    playerSelectedEl.parentNode.classList.add("on-top");
    addComputerElStyles(computerSelection, computerSelectedEl);

    showSelectedChips(playerSelectedEl, computerSelectedEl, allChips);
    nextRoundBtn.addEventListener("click", () => {
      showDefaultChips(playerSelectedEl, computerSelectedEl);
      allChips.forEach((chip) => chip.addEventListener("click", playRound));
    });
  }

  // add click event to all chip
  allChips.forEach((chip) => chip.addEventListener("click", playRound));
}

game();
