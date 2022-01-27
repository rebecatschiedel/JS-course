'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  // look up
  console.log(firstName);

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 2040) {
      var cat = true;
      const catES6 = 'I am a cat';
      const str = `oh, and you are a cat, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // var is function scoped
    console.log(cat);
    // function is block scoped (only in strict mode)
    // add(2, 3); // add is not defined

    // REMEMBER
    // const and let are block scoped
    // console.log(catES6); // reference error
  }

  // var is function scoped
  // console.log(cat); // reference error

  printAge();
  return age;
}

const firstName = 'Zelda';
console.log(calcAge(2016));

// This keyword

console.log('this', this);

const calcAge1 = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAge1(1991);

// Lexical
const calcAge2 = birthYear => {
  console.log(2037 - birthYear);
  // This will point to the parent scope (window, in this case)
  console.log(this);
};

calcAge2(1991);

// Method
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log('this inside a method', this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

// regular function call
const f = jonas.calcAge;
// f(); // undefined

// Arrow functions inside methods

const barbara = {
  name: 'Barbara',
  year: 2005,
  calcAge: function () {
    console.log(2037 - this.year);

    const greet = function () {
      console.log('this inside a function inside a method', this);
      console.log(this.name);
    };
    //greet(); //undefined: this is a regular function call, it creates its own this
  },
};

barbara.calcAge();

const barbara1 = {
  name: 'Barbara1',
  year: 2005,
  calcAge: function () {
    console.log(2037 - this.year);

    const greet = () => {
      console.log('this inside an arrow function inside a method', this);
      console.log(this.name);
    };
    greet(); // the arrow function inherit the this from the parent scope, Barbara1 in this case.
  },
};

barbara1.calcAge();

// arguments keyword
const addExp = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExp(2, 5);
addExp(2, 5, 10);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
//addArrow(2, 5, 10); //Undefined: the arguments keyword does not exist inside arrow functions

// Primitives vs. Reference types

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};

// pointers
const friend = me;
friend.age = 27;

console.log('friend', friend);
console.log('me', me);

// Primitives: number, string, boolean, undefined, null, symbol, bgInt
// Objects: object literal, arrays, functions...

// primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log('old last name', oldLastName);
console.log('last name', lastName);

// reference types
const jessica = {
  firstName: 'jessica',
  lastName: 'davis',
  age: 38,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'williams';

console.log('before the marriage', jessica);
console.log('after the marriage', marriedJessica);

// copying objects
const jessica2 = {
  firstName: 'jessica2',
  lastName: 'davis',
  age: 38,
  family: ['brother', 'sister'],
};

// Object.assign only creates a shallow copy - only copy the properties in the first level
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Albertus';
jessicaCopy.family.push('sis in law');

console.log('before the marriage', jessica2);
console.log('after the marriage', jessicaCopy);
