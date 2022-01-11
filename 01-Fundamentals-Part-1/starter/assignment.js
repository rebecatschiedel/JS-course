let country = "Pindamonhangaba";
const continent = "Mercurio";
// let population = 50 * (10 ^ 6);
let population = 1;

console.log(
  `${country} is in ${continent} and has a total population of ${population}`
);

let isIsland = true;
// let isIsland = false;
let language;

console.log(
  `${country} is in ${continent} and has a total population of ${population}`,
  isIsland,
  language
);

// language = "english";
language = "martines";
// continent = "africa"

let newPopulation = population / 2;
population++;
console.log(population, newPopulation);

let finlandPopulation = 6 * (10 ^ 6);
if (finlandPopulation > population) console.log("Finland won!!!");
else console.log("you did something wrong");

let averagePopulation = 33 * (10 ^ 6);
if (population < averagePopulation) console.log("you need more people");
else console.log("you did something wrong");

let description = `${country} is in ${continent}, and its ${population} people speak ${language}`;
console.log(description);

console.log("9" - "5"); //4
console.log("9" / "5");
console.log("9" + "5");
console.log("19" - "13" + "17"); //23 right answer:617
console.log("19" - "13" + 17); //23
console.log("123" < 57); //F

// + sign concatenates strings, automatically converting numbers to string.
// the - sign is a mathematical operator and automatically converts strings to numbers.
// so, whenever there is a minus sign, the typeof will be a number.
console.log("coertion: ", 5 + 6 + "4" + 9 - 4 - 2); //18 right answer:1143
console.log(typeof (5 + 6 + "4" + 9 - 4 - 2)); //number
console.log("5" + 3); //53
console.log(typeof ("5" + 3)); //string
console.log(5 + "3" + 3); //533
console.log(typeof (5 + "3" + 3)); //string
console.log(5 + "3" + 3 - 2); //531
console.log(typeof (5 + "3" + 3 - 2)); //string

//Equality operators
/*
let numNeighbours = Number(
  prompt("how many neighbour countries does your country have?")
);

if (numNeighbours === 1) console.log("only 1 border");
else if (numNeighbours > 1) console.log("more than 1 border");
else console.log("no borders");
*/

//Logical operators

if (language === "english" && population < 55 * (10 ^ 6) && !isIsland)
  console.log("you should live here");
else console.log(`${country} is not for you`);
console.log("test 2: " + !isIsland);

switch (language) {
  case "chinese":
  case "mandarim":
    console.log("most number of native speakers");

    break;
  case "spanish":
    console.log("2nd place in number of native speakers");

    break;
  case "english":
    console.log("3rd place");

    break;
  case "hindi":
    console.log("number 4");

    break;
  case "arabic":
    console.log("5th most spoken language too");

    break;

  default:
    console.log("Great language too");
    break;
}

population = 40;
// population > 33
//   ? console.log(`${country}'s population is above average`)
//   : console.log(`${country}'s population is bellow average`);

console.log(
  `${country}'s population is ${population > 33 ? "above" : "bellow"} average`
);
