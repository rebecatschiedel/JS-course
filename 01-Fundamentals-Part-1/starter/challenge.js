/* Challenge 1 */

let markMass, markHeight, johnMass, johnHeight;

//Data 1
markMass = 78;
markHeight = 1.69;

johnMass = 92;
johnHeight = 1.95;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;

let markHigherBMI = markBMI > johnBMI;

console.log("test 1:", markHigherBMI);
console.log(markBMI, johnBMI);

/* Data 2
markMass = 95;
markHeight = 1.88;

johnMass = 85;
johnHeight = 1.76;

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;

markHigherBMI = markBMI > johnBMI;

console.log(markHigherBMI);
console.log(markBMI, johnBMI);
*/

//Objects
const mark = {
  mass: 78,
  height: 1.69,
};
const john = {
  mass: 92,
  height: 1.95,
};

let markHigher = mark.mass / mark.height ** 2 > john.mass / john.height ** 2;
console.log(markHigher);

/* Challenge 2 */

if (markBMI > johnBMI)
  console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
else console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})!`);

markBMI > johnBMI
  ? console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`)
  : console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})!`);

//Challenge 3

//Data 1
const averageDolphin = (96 + 108 + 89) / 3;
const averageKoalas = (88 + 91 + 110) / 3;

//Data bonus 1
const averageDolphin1 = (97 + 112 + 101) / 3;
const averageKoalas1 = (109 + 95 + 123) / 3;

//Data bonus 2
const averageDolphin2 = (97 + 112 + 101) / 3;
const averageKoalas2 = (109 + 95 + 106) / 3;

console.log(averageDolphin, averageKoalas);

console.log(
  `${
    averageDolphin === averageKoalas
      ? "this is a draw"
      : averageDolphin > averageKoalas
      ? "Dolphin won!"
      : "Koalas won"
  }`
);

//bonus 1
if (averageDolphin1 === averageKoalas1) console.log("Draw");
else if (averageDolphin1 > averageKoalas1 && averageDolphin1 >= 100)
  console.log("dolphin won");
else if (averageDolphin1 < averageKoalas1 && averageKoalas1 >= 100)
  console.log("koalas won");
else console.log("no one got 100 points");

//bonus 2
if (
  averageDolphin2 === averageKoalas2 &&
  averageDolphin2 >= 100 &&
  averageKoalas2 >= 100
)
  console.log("Draw");
else if (averageDolphin2 > averageKoalas2 && averageDolphin2 >= 100)
  console.log("dolphin won");
else if (averageDolphin2 < averageKoalas2 && averageKoalas2 >= 100)
  console.log("koalas won");
else console.log("no one got 100 points");

//challenge 4
let bill = 275; //275,40,430
let tip = 50 <= bill && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip} and the total was ${bill + tip} `
);
