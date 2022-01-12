'use strict';

// Select elements from DOM
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const scores = document.querySelectorAll('.score');
const currentScores = document.querySelectorAll('.current-score');
const dice = document.querySelector('.dice');
const backgroundSections = document.querySelectorAll('.player');

// Define current player variable
let diceNumber;
let currentPlayer = 0;
let currentScoreCount = 0;
dice.style.display = 'none';

// Active player selection
const changePlayer = function () {
  // Change current player
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  // Reset current score
  currentScoreCount = 0;

  // Update the current score to 0
  currentScores.forEach(score => (score.textContent = 0));

  // Update background
  backgroundSections.forEach(section =>
    section.classList.toggle('player--active')
  );
};

// Win function
const checkWinner = function () {
  let totalScore =
    Number(scores[currentPlayer].textContent) + currentScoreCount;
  // Check if total score = 100
  if (totalScore >= 10) {
    // Hide the dice
    dice.style.display = 'none';

    // Update the background
    backgroundSections[currentPlayer].classList.add('player--winner');

    // Disable Roll dice and Hold buttons
    btnRollDice.disabled = true;
    btnHold.disabled = true;
  }
};

// Add a function to handle the "Roll Dice" button clicked
const handleRollDice = function () {
  // Calculate a random number for the dice
  diceNumber = Math.trunc(Math.random() * 6 + 1);

  // Show dice
  dice.src = `dice-${diceNumber}.png`;
  dice.style.display = 'block';

  // It the number === 1
  if (diceNumber === 1) changePlayer();
  else {
    // Update current score for current player
    currentScoreCount += diceNumber;
    currentScores[currentPlayer].textContent = currentScoreCount;

    //Check if it wins the game
    checkWinner();
  }
};

// Add a function to handle the "Hold" button clicked
const handleHold = function () {
  let totalScoreCount =
    currentScoreCount + Number(scores[currentPlayer].textContent);

  // Update total score
  scores[currentPlayer].textContent = totalScoreCount;

  changePlayer();

  // Hide dice
  dice.style.display = 'none';
};

// Add a function to handle the "New Game" button clicked
const handleNewGame = function () {
  // Reset score
  currentScores.forEach(score => (score.textContent = 0));
  scores.forEach(score => (score.textContent = 0));

  currentScoreCount = 0;

  // Reset player
  currentPlayer = 0;
  backgroundSections[0].classList.add('player--active');
  backgroundSections[1].classList.remove('player--active');

  // Reset background
  backgroundSections.forEach(section =>
    section.classList.remove('player--winner')
  );

  // Hide dice
  dice.style.display = 'none';

  // Enable buttons
  btnRollDice.disabled = false;
  btnHold.disabled = false;
};

// Add event listener to the buttons
btnRollDice.addEventListener('click', handleRollDice);
btnHold.addEventListener('click', handleHold);
btnNewGame.addEventListener('click', handleNewGame);
