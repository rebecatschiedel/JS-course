'use strict';

const bookingFlight = function (
  numFlight,
  numPassengers = 1,
  price = 3 * numPassengers
) {
  const booking = {
    numFlight,
    numPassengers,
    price,
  };
  console.log(booking);
};

bookingFlight('AAA', undefined, 10);

const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('hey')('Cancan');

const addTax = (rate, value) => value + value * rate;

const customTax = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

customTax(100)(0.29);

// Challenge 1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
};

/* 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?) 

2. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1" 
*/

poll.displayResults = function (type = 'array') {
  if (type === 'string') {
    const results = this.answers.join(', ');
    console.log(`Poll results are ${results}`);
    return;
  }

  console.log(this.answers);
};

poll.registerNewAnswer = function () {
  const answer = Number(
    prompt(`What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)`)
  );

  if (answer >= 0 && answer <= 3) {
    this.answers[answer]++;
  }

  this.displayResults();
};

const testData = {
  answers: [5, 2, 3],
  data2: [1, 5, 3, 9, 6, 1],
};
poll.displayResults.call(testData, 'string');
poll.displayResults.call(testData);

const testData2 = {
  data1: [5, 2, 3],
  answers: [1, 5, 3, 9, 6, 1],
};
poll.displayResults.call(testData2, 'string');
poll.displayResults.call(testData2);

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

// F is not a function until g is called
g();
f();

//Challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
