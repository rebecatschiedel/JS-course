'use strict';

// Select the DOM elements
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const message = document.querySelector('.message');
const scoreCount = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const guess = document.querySelector('.guess');

const initialValues = {
  message: 'Start guessing...',
  scoreCount: 20,
  highscore: 0,
  number: '?',
  guessInput: '',
};

// Initialize your Number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscoreCount = 0;

// Create a function to reset the game
const handleReset = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  checkButton.addEventListener('click', handleCheck);

  // Reset your values
  message.textContent = initialValues.message;
  scoreCount.textContent = initialValues.scoreCount;
  number.textContent = initialValues.number;
  guess.value = initialValues.guessInput;
  score = initialValues.scoreCount;

  // Reset style
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
};

// Create a function to check if the guessed number is equal to the secret number
const handleCheck = function () {
  // Get the guessed number from the DOM
  let guessInput = Number(guess.value);

  //Check if there is an input
  if (!guessInput) {
    message.textContent = 'No number!';
    return;
  }

  // Check if the input is a number and if it is between 1 and 20
  if (guessInput < 1 || guessInput > 20) {
    // Update message
    message.textContent = 'Please select a number between 1 and 20!';
    return;
  }

  // Check if the number are equal
  if (guessInput === secretNumber) {
    // Show the secret number
    number.textContent = secretNumber;

    // update the message
    message.textContent = 'you got it girl!';

    // Check the highscore and, if necessary, update it too
    if (score > highscoreCount) {
      highscoreCount = score;
      highscore.textContent = highscoreCount;
    }

    // update the background color and make the number wider
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  } else {
    // Decrease the score
    scoreCount.textContent = --score;

    if (score === 0) {
      message.textContent = 'you lost the game';
      // Remove the event listener so the button will be disabled.
      checkButton.removeEventListener('click', handleCheck);
      return;
    }

    // Update the message
    message.textContent =
      guessInput < secretNumber ? 'Too low...' : 'Too high...';
  }
};

// Add an event to when the check button is clicked
checkButton.addEventListener('click', handleCheck);

// Add an event to when the again button is clicked
againButton.addEventListener('click', handleReset);
