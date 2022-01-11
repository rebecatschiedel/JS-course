"use strict";

// Challente 1

const calcAverage = (a, b, c) => (a + b + c) / 3;

// data 1
const avgDolphins1 = calcAverage(44, 23, 71);
const avgKolalas1 = calcAverage(65, 54, 49);

// data 2
const avgDolphins2 = calcAverage(85, 54, 41);
const avgKolalas2 = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2)
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  else if (avgKoalas >= avgDolphins * 2)
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  else if (avgDolphins === avgKoalas) console.log(`it is a draw`);
  else console.log(`there is no winner`);
}

checkWinner(avgDolphins1, avgKolalas1);
checkWinner(avgDolphins2, avgKolalas2);

// Challenge 2
const bills = [125, 555, 44];
const tips = [];
const totals = [];

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

bills.forEach((bill) => {
  const tip = calcTip(bill);
  tips.push(tip);
  totals.push(tip + bill);
});

console.log(bills);
console.log(tips);
console.log(totals);

// Challenge 3

const person1 = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
  },
};
const person2 = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
  },
};

person1.calcBMI() > person2.calcBMI()
  ? console.log(
      `${person1.fullName}'s BMI(${person1.BMI}) is higher than ${person2.fullName}'s BMI(${person2.BMI})`
    )
  : console.log(
      `${person2.fullName}'s BMI(${person2.BMI}) is higher than ${person1.fullName}'s BMI(${person1.BMI})`
    );

const person3 = {
  fullName: "Mark Miller",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.BMI = Math.round(this.mass / this.height ** 2);
    return this.BMI;
  },
};

const person4 = {
  fullName: "John Smith",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = Math.round(this.mass / this.height ** 2);
    return this.BMI;
  },
};

person3.calcBMI() > person4.calcBMI()
  ? console.log(
      `${person3.fullName}'s BMI(${person3.BMI}) is higher than ${person4.fullName}'s BMI(${person4.BMI})`
    )
  : console.log(
      `${person4.fullName}'s BMI(${person4.BMI}) is higher than ${person3.fullName}'s BMI(${person3.BMI})`
    );

// Challenge 4
const billsA = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsA = [];
const totalsA = [];

for (let x = 0; x < billsA.length; x++) {
  const tip = calcTip(billsA[x]);
  tipsA.push(tip);
  totalsA.push(tip + billsA[x]);
}

console.log(tipsA);
console.log(totalsA);

const tipsB = [];
const totalsB = [];

billsA.forEach((bill) => {
  const tip = calcTip(bill);
  tipsB.push(tip);
  totalsB.push(tip + bill);
});

console.log(tipsB);
console.log(totalsB);

const calcAverageA = function (arr) {
  /*
  let sum = 0;
  for (let x = 0; x < arr.length; x++) {
    sum += arr[x];
  }
  */
  const sum = arr.reduce((previousSum, next) => previousSum + next, 0);
  return sum / arr.length;
};

console.log(Math.trunc(calcAverageA(totalsA)));
console.log(Math.trunc(calcAverageA(tipsA)));
