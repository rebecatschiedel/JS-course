'use strict';

const buttons = document.querySelectorAll('.show-modal');
const buttonCloseModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const handleClick = function () {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
};

buttons.forEach(button => button.addEventListener('click', handleClick));

buttonCloseModal.addEventListener('click', handleClick);

// Close the modal when click outside it
