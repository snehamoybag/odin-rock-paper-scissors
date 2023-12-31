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

// move all chips to center
function closeDefaultChips() {
  const board = document.querySelector("#game-board");
  board.classList.add("animate-closing");
}

// open default chips / move it from center to their respective positions
function openDefaultChips(playerSelectedEl, delay) {
  const board = document.querySelector("#game-board");
  setTimeout(() => board.classList.remove("animate-closing"), delay);

  // when default chips are open / on their position
  playerSelectedEl.parentNode.addEventListener(
    "transitionend",
    () => {
      playerSelectedEl.parentNode.classList.remove("on-top");
    },
    { once: true }
  );
}

// style computer chip element with computer choice
function showComputerChip(selection, selectionEl) {
  const chipNameEl = selectionEl.querySelector(".chip__name");

  selectionEl.classList.add(`chip--${selection}`);
  chipNameEl.textContent = pascalCase(selection);
  selectionEl.parentNode.classList.remove("hidden");
}

// remove computer chip element styles from previous round
function hideComputerChip(selectionEl) {
  const chipNameEl = selectionEl.querySelector(".chip__name");

  selectionEl.classList.remove("chip--rock", "chip--paper", "chip--scissors");
  chipNameEl.textContent = "";
  selectionEl.parentNode.classList.add("hidden");
}

// hide non-selected chips
function hideExtraChips(playerSelectedEl, computerSelectedEl) {
  const allChips = document.querySelectorAll(".chip");

  allChips.forEach((chip) => {
    if (chip !== playerSelectedEl && chip !== computerSelectedEl) {
      chip.parentNode.classList.add("hidden");
    }
  });
}

// show default chips
function showExtraChips(computerSelectedEl) {
  const allChips = document.querySelectorAll(".chip");
  allChips.forEach((chip) => {
    if (chip !== computerSelectedEl) {
      chip.parentNode.classList.remove("hidden");
    }
  });
}

// show selected chips
function openSelectedChips(playerSelectedEl, computerSelectedEl, delay) {
  const board = document.querySelector("#game-board");
  const playerElWrapper = playerSelectedEl.parentNode;
  const computerElWrapper = computerSelectedEl.parentNode;

  setTimeout(() => {
    playerElWrapper.classList.add("animate-player-selection");
    computerElWrapper.classList.add("animate-computer-selection");
    board.classList.remove("animate-closing");
  }, delay);
}

// close selected chips
function closeSelectedChips(playerSelectedEl, computerSelectedEl) {
  const board = document.querySelector("#game-board");
  playerSelectedEl.parentNode.classList.remove("animate-player-selection");
  computerSelectedEl.parentNode.classList.remove("animate-computer-selection");
  board.classList.add("animate-closing");
}

// add choser texts above selected chips
function addChoserTexts(playerSelectedEl, computerSelectedEl) {
  const playerTextEl = playerSelectedEl.querySelector(".chip__choser-txt");
  const computerTextEl = computerSelectedEl.querySelector(".chip__choser-txt");

  // when selected chips are finished opening
  computerSelectedEl.parentNode.addEventListener(
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

// add a effect to the winner chip
function addWinnerEffs(
  playerSelectedEl,
  computerSelectedEl,
  roundResult,
  delay
) {
  setTimeout(() => {
    switch (roundResult) {
      case "win":
        playerSelectedEl.classList.add("winner");
        break;
      case "lose":
        computerSelectedEl.classList.add("winner");
        break;
    }
  }, delay);
}

// remove winner effects
function removeWinnerEffs(playerSelectedEl, computerSelectedEl) {
  playerSelectedEl.classList.remove("winner");
  computerSelectedEl.classList.remove("winner");
}

// clean up previous round styles
function cleanupPreviousRoundStyles(playerSelectedEl, computerSelectedEl) {
  const resultsEl = document.querySelector("#round-results");
  resultsEl.classList.add("visually-hidden");
  removeWinnerEffs(playerSelectedEl, computerSelectedEl);
  removeChoserTexts(playerSelectedEl, computerSelectedEl);
  closeSelectedChips(playerSelectedEl, computerSelectedEl);

  // when selected chips are closed
  playerSelectedEl.parentNode.addEventListener(
    "transitionend",
    () => {
      const delay = 500; /* ms */
      hideComputerChip(computerSelectedEl);
      showExtraChips(computerSelectedEl);
      openDefaultChips(playerSelectedEl, delay);
    },
    {
      once: true,
    }
  );
}

// play a 5 round game
function game() {
  const allChips = document.querySelectorAll(".chip");
  const maxRound = 5;
  let nthRound = 1;
  let playerTotalScore = 0;
  let computerTotalScore = 0;

  // show round results
  function showRoundResults(
    playerSelection,
    computerSelection,
    roundResult,
    delay
  ) {
    const resultsEl = document.querySelector("#round-results");
    const roundNumEl = document.querySelector("#round-number");
    const titleEl = document.querySelector("#result-title");
    const descriptionEl = document.querySelector("#result-desc");
    const playerScoreEl = document.querySelector("#player-score");
    const computerScoreEl = document.querySelector("#computer-score");
    const nextRoundBtn = document.querySelector("#play-next-round");

    roundNumEl.textContent = `${nthRound}/${maxRound}`;
    // hide next round button if it is the last round
    if (nthRound === maxRound) nextRoundBtn.classList.add("hidden");

    switch (roundResult) {
      case "win":
        titleEl.textContent = "You Win!";
        descriptionEl.textContent = `${pascalCase(
          playerSelection
        )} beats ${pascalCase(computerSelection)}`;
        playerTotalScore += 1;
        break;
      case "lose":
        titleEl.textContent = "You Lose";
        descriptionEl.textContent = `${pascalCase(
          computerSelection
        )} beats ${pascalCase(playerSelection)}`;
        computerTotalScore += 1;
        break;
      case "draw":
        titleEl.textContent = "It's a Draw!";
        descriptionEl.textContent = "Player and Computer chose the same Chip";
        break;
    }
    playerScoreEl.textContent = playerTotalScore;
    computerScoreEl.textContent = computerTotalScore;
    setTimeout(() => {
      resultsEl.classList.remove("visually-hidden");
    }, delay);
  }

  // show end screen after 5th round
  function showEndResults(delay) {
    const endResultsEl = document.querySelector("#end-results");
    const subTitleEl = document.querySelector(".end-screen__subtitle");
    const titleEl = document.querySelector(".end-screen__title");
    const playerTotalScoreEl = document.querySelector("#player-total-score");
    const computerTotalScoreEl = document.querySelector(
      "#computer-total-score"
    );
    const newGameBtn = document.querySelector("#new-game");

    playerTotalScoreEl.textContent = playerTotalScore;
    computerTotalScoreEl.textContent = computerTotalScore;
    newGameBtn.addEventListener(
      "click",
      () => {
        const btnText = newGameBtn.querySelector(".end-screen__btn_txt");
        const loadingSpinner = newGameBtn.querySelector(".loading-spinner");
        // hide button text and show loading spinner
        btnText.classList.add("visually-hidden");
        loadingSpinner.classList.remove("hidden");
        location.reload();
      },
      {
        once: true,
      }
    );
    if (playerTotalScore > computerTotalScore) {
      subTitleEl.textContent = "Congratulations!";
      titleEl.textContent = "You Win the Game!";
    } else if (playerTotalScore < computerTotalScore) {
      subTitleEl.textContent = "Uh oh..";
      titleEl.textContent = "You Lose the Game";
    } else {
      subTitleEl.textContent = "Evenly matched!";
      titleEl.textContent = "The Game ends in A Draw";
    }
    setTimeout(() => {
      endResultsEl.classList.remove("hidden");
    }, delay);
  }

  // play a round
  function playRound() {
    // remove click event from all chips after the fitst click
    allChips.forEach((chip) =>
      chip.removeEventListener("click", playRound, { once: true })
    );
    const playerSelection = this.dataset.chip;
    const playerSelectedEl = this;
    const computerSelection = getComputerSelection();
    const computerSelectedEl = document.querySelector("#computer-chip");
    const nextRoundBtn = document.querySelector("#play-next-round");
    const roundResult = getRoundResult(playerSelection, computerSelection);

    playerSelectedEl.parentNode.classList.add("on-top");
    closeDefaultChips();
    playerSelectedEl.parentNode.addEventListener(
      "transitionend",
      () => {
        const baseDelay = 500; /* ms */
        const roundResultDelay = baseDelay + 700;
        const endResultDelay = roundResultDelay + 800;
        hideExtraChips(playerSelectedEl, computerSelectedEl);
        showComputerChip(computerSelection, computerSelectedEl);
        openSelectedChips(playerSelectedEl, computerSelectedEl, baseDelay);
        addChoserTexts(playerSelectedEl, computerSelectedEl);
        addWinnerEffs(
          playerSelectedEl,
          computerSelectedEl,
          roundResult,
          roundResultDelay
        );
        showRoundResults(
          playerSelection,
          computerSelection,
          roundResult,
          roundResultDelay
        );
        // show end results after last round
        if (nthRound === maxRound) showEndResults(endResultDelay);
      },
      {
        once: true,
      }
    );
    // add click event on play next round button
    nextRoundBtn.addEventListener(
      "click",
      () => {
        nthRound += 1;
        cleanupPreviousRoundStyles(playerSelectedEl, computerSelectedEl);
        // re add click event to all buttons
        allChips.forEach((chip) => chip.addEventListener("click", playRound));
      },
      { once: true }
    );
  }

  // add click event to all chip
  allChips.forEach((chip) =>
    chip.addEventListener("click", playRound, { once: true })
  );
}

game();
