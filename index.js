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

// get player choice
function getPlayerSelection(nthRound) {
  const userInput = prompt(
    `Round ${nthRound}! Type your choice: Rock, Paper or Scissors`,
    pascalCase(getRandomSelection())
  );
  const playerSelection = userInput.trim().toLowerCase();
  return playerSelection;
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

// play a round
function playRound(playerSelection, computerSelection) {
  const isPlayerSelectionValid = validatePlayerSelection(playerSelection);
  const result = getRoundResult(playerSelection, computerSelection);

  if (!isPlayerSelectionValid) {
    showError(isPlayerSelectionValid);
    return; // end round
  }

  showSelections(playerSelection, computerSelection);
  showRoundResults(result, playerSelection, computerSelection);

  return result;
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

// run game with number of times
function game() {
  const numberOfRounds = 5;
  let playerScore = 0;
  let computerScore = 0;

  for (let round = 1; round <= numberOfRounds; round++) {
    const playerSelection = getPlayerSelection(round);
    const computerSelection = getRandomSelection();
    const roundResult = playRound(playerSelection, computerSelection);

    switch (roundResult) {
      case "win":
        playerScore += 1;
        break;
      case "lose":
        computerScore += 1;
        break;
    }
  }

  showScores(playerScore, computerScore);
  showEndGameMessage(playerScore, computerScore);
}

// run game on page load
game();
