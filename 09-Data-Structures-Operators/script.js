'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order Received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1},  ${ing2}, and  ${ing3}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'rua dos bobos n 0',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'rua dos bobos n 0',
  starterIndex: 1,
});

// Destructuring Arrays
let [first, second] = restaurant.categories;
const [one, , third] = restaurant.categories;

console.log(first, second, one, third);

// Switching variables with destructuring
[first, second] = [second, first];

console.log('first el:', second, 'second el:', first);
console.log(restaurant.categories);

// Receive two return value from a function
console.log(restaurant.order(2, 0));
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

// Nested destructuring
const nested = [2, 4, 5, [1, 8]];

const [i, , , j] = nested;
console.log(i, j);

const [l, , , [m, n]] = nested;
console.log(l, m, n);

// Default Values
const [p, q, r] = [8, 9];
console.log(p, q, r);

const [s = 1, t = 1, u = 1] = [5, 6];
console.log(s, t, u);

// Destructuring Objects
const { name, openingHours, categories } = restaurant; //specify the name os the properties
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
console.log(restaurant.menu); // Undefined for inexistent properties
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating values
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

//{a, b} = obj; //syntax error
//({ a, b } = obj)

// Nested Objects
const { fri } = openingHours;
console.log(fri);

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//The Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArrA = [1, 2, ...arr];
const newArrB = [1, 2, arr];
console.log(newArrA);
console.log(newArrB);

//Use the spread operator whenever you need the elements of the array individually
console.log(...newArrA);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Shallow copy array
const mainMenuCopy = [...restaurant.mainMenu];
//console.log(mainMenuCopy);

//Join 2+ arrays
const starterMainMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
//console.log(starterMainMenu);

//Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S'];
console.log(letters);
console.log(...letters);

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
// restaurant.orderPasta(...ingredients);
restaurant.orderPasta('tomatoes', 'cheese', 'pepperoni');

//Objects
const newRestaurant = {
  founded: '1989',
  ...restaurant,
  founder: 'Ratatouille',
};

console.log(newRestaurant);

// Shallow copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);

//Challenge 1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create one player array for each team (variables 'players1' and 'players2')
/* const players1 = game.players[0];
 const players2 = game.players[1]; */
const [players1, players2] = game.players;

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
const [gk, ...fieldPlayers] = players1;

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
const allPlayers = [...players1, ...players2];

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
//const { team1, x: draw, team2 } = game.odds;
//const {odds: {team1, x: draw, team2}} = game;

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
const printGoals = function (...players) {
  players.forEach(player => console.log(player, players.length));
};

printGoals('a', 'b', 'c');

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
// console.log(team1 > team2 && game.team2);
// console.log(team1 < team2 && game.team1);

// CHALLENGE 2
//1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski"

for (const [i, name] of game.scored.entries())
  console.log(`goal ${i + 1}: ${name}`);

//2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);
let sum = 0;
for (const num of odds) sum += num;
console.log(Math.trunc(sum / odds.length));
console.log((sum / odds.length).toFixed(2));

/*3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object*/

for (const [key, value] of Object.entries(game.odds))
  console.log(
    `Odd of ${game[key] ? 'victory ' + game[key] : 'draw'}: ${value}`
  );

/*4. Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}*/

const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);

console.log(new Set('Rebecca'));

//Challenge 3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

//1. Create an array 'events' of the different game events that happened (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(events);

//2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents);

//3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)

const average = (90 / gameEvents.size).toFixed();
console.log(`An event happened, on average, every ${average} minutes`);

/*4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL*/

for (const [key, value] of gameEvents) {
  key <= 45 && console.log(`[FIRST HALF] ${key}: ${value}`);
  key > 45 && key <= 90 && console.log(`[SECOND HALF] ${key}: ${value}`);
  key > 90 && console.log(`[OVERTIME] ${key}: ${value}`);
}

// Challenge 3

const textArea = document.createElement('textarea');
document.body.append(textArea);
const button = document.createElement('button');
document.body.append(button);

button.addEventListener('click', () => {
  camelCase(textArea.value);
});

const camelCase = function (text) {
  //separate strings by line
  const textArray = text.split('\n');
  //separate the strings in each line
  textArray.forEach((el, index) => {
    const lowNormalizedText = el.trim().toLowerCase().split('_');
    const normalizedText =
      lowNormalizedText[0] +
      lowNormalizedText[1][0].toUpperCase() +
      lowNormalizedText[1].slice(1);

    console.log(normalizedText.padEnd(20) + '✅'.repeat(index + 1));

    // const index = el.indexOf('_');
    // console.log(index);
    // //el.slice(0, index) + el.replace(el[index + 1], el[index + 1].toUpperCase());
    // console.log(el[index + 1]);
    // console.log(el.replace(el[index + 1], el[index + 1].toUpperCase()));
  });
  //trimm
  //camel case
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Delayed Departure from x to Y (00h00)

const flightsArray = flights.split('+');

for (const flight of flightsArray) {
  const flightArray = flight.split(';');
  const flightStatus = flightArray[0].replaceAll('_', ' ').trim();
  console.log(
    `${
      flightStatus.startsWith('Delayed') ? 'RED ' + flightStatus : flightStatus
    } from ${flightArray[1].slice(0, 3).toUpperCase()} to ${flightArray[2]
      .slice(0, 3)
      .toUpperCase()} (${flightArray[3].replace(':', 'h')})`.padStart(50)
  );
}
