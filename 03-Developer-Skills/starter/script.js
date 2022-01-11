// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/* How to add snippets:
got to settings -> user snippets -> New global snippets file... -> name it -> add the snippet
*/

// Using TODO extension REMEMBER

// Live server extension
/* Npm live-server
any file that is changed will reload the page
type live-server on the terminal to start it
*/
console.log('hey girl');

// HOW TO LEARN TO CODE

/* Set a goal
I want to get a job as a front-end developer until the end of the year
I want to build the budget app and my portfolio
*/

// Using Google, Stackoverflow and MDN

/*
Problem: We work for a company building a smart home thermometer. Our most recent task is this:"Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."
*/

/*
1) Understanding the problem
- What is temperature amplitude?
The difference between highest and lowest temp.

- How to compute max and min temperatures?

- What's a sensor error looks like? And what to do when it occurs?

2) Breaking up into sub-problems
- How to ignore errors?
- Find max value in tem array
- Find min value in tem array
- Subtract min from max (amplitude) and return it.

*/

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = temps => {
  let min = temps[0];
  let max = temps[0];

  for (let i = 0; i < temps.length; i++) {
    let currTemp = temps[i];
    if (typeof currTemp != 'number') continue;
    if (currTemp < min) min = currTemp;
    if (currTemp > max) max = currTemp;
  }

  return max - min;
};

console.log(calcTempAmplitude(temperatures));

// PROBLEM 2
// Function need to receive 2 arrays
// merge 2 arrays

const temperatures2 = [3, -2, -6, -1, 'error', 9, 13, 18, 15, 14, 9, 5];

const calcTempAmplitude2 = (temps1, temps2) => {
  const temps = temps1.concat(temps2);
  let min = temps[0];
  let max = temps[0];

  for (let i = 0; i < temps.length; i++) {
    let currTemp = temps[i];
    if (typeof currTemp != 'number') continue;
    if (currTemp < min) min = currTemp;
    if (currTemp > max) max = currTemp;
  }

  return max - min;
};

console.log(calcTempAmplitude2(temperatures, temperatures2));

// Identifying bugs
/* 
console.table() 
console.warn()
console.error()
*/

// DEBUGGER GOOGLE CHROME
/*
Inspect -> Sources -> breakpoints
*/

// Debugger: add the word debugger from your code above the code you want to examine
// REMEMBER: To use debugger while coding

// Challenge 1

const temps1 = [17, 21, 23];
const temps2 = [12, 5, -5, 0, 4];

const printForecast = function (temps) {
  let tempString = '';

  for (let i = 0; i < temps.length; i++) {
    tempString += `${temps[i]}C in ${i + 1} day${i != 1 ? 's' : ''}... `;
  }
  return tempString;
};

console.log(printForecast(temps1));
console.log(printForecast(temps2));
