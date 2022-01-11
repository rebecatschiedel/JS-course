'use strict';

// Select all elements from DOM
const buttons = document.querySelectorAll('.show-modal');
const buttonCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Show and hide the modal by toggling the class
const handleClick = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

// Open modal when click any of the buttons
buttons.forEach(button => button.addEventListener('click', handleClick));

// Close modal when click the button on the modal
buttonCloseModal.addEventListener('click', handleClick);

// Close the modal when click outside it
overlay.addEventListener('click', handleClick);
