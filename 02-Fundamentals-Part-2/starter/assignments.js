"use strict";

//Functions

function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people an its capital is ${capitalCity}.`;
}

const infoBrasil = describeCountry("Brasil", 214, "Brasilia");
describeCountry("Turkey", 85, "Ankara");
describeCountry("Canada", 38, "Ottawa");

console.log(infoBrasil);

// Function Declarations vs. Expressions

let worldPopulation = 7900;

function percentageOfWorld1(population) {
  return population / 79;
}

console.log(percentageOfWorld1(214));
console.log(percentageOfWorld1(85));
console.log(percentageOfWorld1(38));

// Expressions return a value
const percentageOfWorld2 = function (population) {
  return population / 79;
};

console.log(percentageOfWorld2(214));
console.log(percentageOfWorld2(85));
console.log(percentageOfWorld2(38));

// Arrow functions

const percentageOfWorld3 = (population) => population / 79;

console.log(percentageOfWorld3(214));
console.log(percentageOfWorld3(85));
console.log(percentageOfWorld3(38));

// Functions calling other functions

function describePopulation(country, population) {
  return `${country} has ${population} million people, which is about ${percentageOfWorld1(
    population
  )}% of the world.`;
}

console.log(describePopulation("Brasil", 214));

// Introduction to Arrays

// const countries = new Array('brasil', 'canada', 'turquia', 'eua')
const countries = ["brasil", "canada", "turquia", "eua"];

const populations = [214, 38, 83, 332];

populations.length === 4
  ? console.log("this array has 4 elements")
  : console.log("this array does not have 4 elements");

const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];
console.log(percentages);

// Basic Array operations (method)

const neighbours = ["Argentina", "Paraguai", "Peru"];
neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop("Utopia");
console.log(neighbours);

neighbours.includes("Germany")
  ? console.log("probably not a central European Country")
  : console.log(neighbours);

neighbours[neighbours.indexOf("Paraguai")] = "Republic of Paraguai";
console.log(neighbours);

// Introduction to Objects

const myCountry = {
  country: "Brasil",
  capital: "Brasilia",
  language: "Portugues",
  population: 212,
  neighbours: [
    "French Guiana",
    "Suriname",
    "Guyana",
    "Venezuela",
    "Colombia",
    "Peru",
    "Bolivia",
    "Paraguai",
    "Argentina",
    "Uruguai",
  ],
};

// Dot vs. Bracket Notation - the square brackets allow the use of expressions

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries
and a capital called ${myCountry.capital}.`);

myCountry.population = myCountry.population + 2;
console.log(myCountry.population);

myCountry["population"] = myCountry.population - 2;
console.log(myCountry.population);

// Object methods
myCountry.describe = function () {
  console.log(
    `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`
  );
};

myCountry.checkIsIsland = function () {
  //this.isIsland = this.neighbours.length ? false : true;
  this.isIsland = !this.neighbours.length;
  return this.isIsland;
};

myCountry.describe();
console.log(myCountry.checkIsIsland());
console.log(myCountry);

// Iteration: the for loop
for (let x = 1; x <= 5; x++) {
  console.log(`Voter number ${x} is currently voting`);
}

// Looping arrays, breaking and continue

/*
Continue: stop the iteration
Break: stop the whole for loop
*/

const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
  percentages2.push(Math.round(percentageOfWorld1(populations[i])));
}

console.log(percentages);
console.log(percentages2, "percentagens rounded up");

// Looping backwards and loops in loops

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let x = 0; x < listOfNeighbours.length; x++) {
  for (let i = 0; i < listOfNeighbours[x].length; i++) {
    console.log(`Neighbour: ${listOfNeighbours[x][i]}`);
  }
}

const listOfNeighboursA = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let x = listOfNeighboursA.length - 1; x >= 0; x--) {
  for (let i = listOfNeighboursA[x].length - 1; i >= 0; i--) {
    console.log("looping backwards: " + listOfNeighboursA[x][i]);
  }
}

// The while loop
// Used in cases where you do not know beforehand how many iterations the loop will have
const percentages3 = [];
let i = 0;

while (i < populations.length) {
  percentages3.push(Math.round(percentageOfWorld1(populations[i])));
  i++;
}

console.log(percentages3, "while loop");
