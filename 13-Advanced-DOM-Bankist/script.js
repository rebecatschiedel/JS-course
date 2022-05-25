'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scroll

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  /*
  getBoundingClientRect() is relative to the window position
  console.log('Coordenades', s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll', scrollX, scrollY);

  //Scrolling
  window.scrollTo(
    s1coords.left + window.scrollX, //curent position + the current scroll
    s1coords.top + window.scrollY
  );

  window.scrollTo({
    left: s1coords.left + window.scrollX, //curent position + the current scroll
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
  */

  section1.scrollIntoView({
    //only works in modern browsers
    behavior: 'smooth',
  });
});

// Page Navigation
/*
document.querySelectorAll('.nav__link').forEach(el =>
  el.addEventListener('click', function (e) {
    e.preventDefault();
    
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
  );
  */

// Page Navigation - Event Delegation

// 1. add event listener to common parent element (nav__links)
// 2. determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  //even when you click on the span inside the button, you still get the button because closest will check the class.
  const clicked = e.target.closest('.operations__tab');

  //Guard Clause
  if (!clicked) return;

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////
// LECTURES

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const oneSection = document.querySelector('.section');
const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');
// returns an HTML collection, not a node list
const allButons = document.getElementsByTagName('button');

document.getElementsByClassName('button'); //HTML collection

//creating and inserting
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button> ';

const header = document.querySelector('.header');
//header.prepend(message);
header.append(message);
//header.prepend(message.cloneNode(true));

//header.before(message);
//header.after(message);

//Delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
    //message.parentElement.removeChild(message);
  });

//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(getComputedStyle(message).height);

//changing css code
//document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'minimalist logo';

console.log(logo.getAttribute('alt'));
logo.setAttribute('company', 'Bankist');
console.log(logo.company); // it only works with expected attributes of the element
console.log(logo.getAttribute('company'));

console.log(logo.src); //absolute version
console.log(logo.getAttribute('src')); // relative path

//Links
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c'); //you can pass more than one class ("c", "d")
logo.classList.toggle('c');
logo.classList.contains('c');
logo.classList.remove('c');
//logo.className = "bananas" - this overrides all the other classes

// Bubling up
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

// this keyword is related to the element that the addEventListener is attached to
// in any event handler, this === e.current.target
/*
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  //Stop propagation - generally not a good idea
  e.stopPropagation();
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
  },
  true
); //event handler looks for capturing phase and not the bubling phase
*/

// DOM traversing
const h1 = document.querySelector('h1');

//Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //that would work no matter how deep the childs are inside the h1 element

console.log(h1.childNodes);
console.log(h1.children); // only works for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

//select the closest h1's parent node with that class/id/type
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)'; // the closest h1 will be itself

/* 
query selector selects children no matter how deep they are in the DOM
closest selects the parent node no matter how far it is in the DOM
*/

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
