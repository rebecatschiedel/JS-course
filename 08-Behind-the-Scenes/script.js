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
  calcAge3: function () {
    console.log('this inside a method', this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge3();

const matilda = {
  year: 2017,
};

matilda.calcAge3 = jonas.calcAge3;
matilda.calcAge3();

const f = jonas.calcAge3;

f();
