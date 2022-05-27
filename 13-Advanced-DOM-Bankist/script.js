'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const imgTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

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

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    //the this keyword comes from the .bind to pass the argument
    logo.style.opacity = this;
  }
};

// mouseenter does not bubble and mouseover does
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
/*
Option 1
//very bad perfomance because the scroll event fires all the time
const initalCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initalCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//Explaining Intersection Observer
const obsCallBack = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);
*/
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries; //entries[0]

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  //guard clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;

  //guard clause
  if (!entry.isIntersecting) return;

  //replace src with data-src will trigger a 'load' event
  entry.target.src = entry.target.dataset.src;

  // only remove the filter after the image is loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px', // will make sure the images are already loaded when we reach that part of the site
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const slider = function () {
  let curSlide = 0;
  const maxSlides = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot"
     data-slide="${i}"></button?`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
      //dot.dataset.slide === slide && dot.classList.add('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnLeft.addEventListener('click', previousSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //is the same as: const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  const init = () => {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();
};

slider();

////////////////////////////////////////////////////
// LECTURES

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const oneSection = document.querySelector('.section');
//const allSections = document.querySelectorAll('.section');

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

const headerTest = document.querySelector('.header');
//headerTest.prepend(message);
headerTest.append(message);
//headerTest.prepend(message.cloneNode(true));

//headerTest.before(message);
//headerTest.after(message);

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
//h1.closest('.header').style.background = 'var(--gradient-secondary)';
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
