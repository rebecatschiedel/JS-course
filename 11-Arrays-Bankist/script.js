'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = interest;
};

const createUsernames = function (accs) {
  accs.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .reduce((acc, name) => acc + name[0], '');
  });
};

createUsernames(accounts);

const updateUI = function (account) {
  //Display Movements
  displayMovements(account.movements);

  //Display Balance
  calcPrintBalance(account);

  //Display Summary
  calcDisplaySummary(account);
};

//Event Handlers
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );

    //Delete account
    inputClosePin.value = inputCloseUsername.value = '';
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;

    //Display UI and Message
    labelWelcome.textContent = `Log in to get started`;
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// const movementUSD = movements.map(function(mov) {
//   return mov * eurToUsd;
// })
const movementUSD = movements.map(mov => mov * eurToUsd);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

// find method only returns the first value of the array that is true for that condition, and it only return one element, not an array

console.log(accounts);

const accountJessica = accounts.find(
  account => account.owner === 'Jessica Davis'
);

let accountJessicaFor;
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') accountJessicaFor = account;
}

console.log(accountJessica);
console.log(accountJessicaFor);

/* Some - Includes - Find - Filter - Every
 -- Includes will return boolean and it uses triple equality
 -- Filter will return an array with all the true elements
 -- Find accepts a function and return the first element that is true (EQUALITY)
 -- Some accepts a function, but returns only a boolean (CONDITION)
 -- Every accetps a function, but only returns true if all the elements are true
*/

//Arrays

//creates a new array with 7 designated spaces
const a = new Array(7);
//mutates the array
//a.fill(1);
a.fill(1, 3, 5);
console.log(a);
// The fill method can be used in existent arrays, and this will mutate the original array.

// Array.from
const b = Array.from({ length: 7 }, () => 1);
console.log(b);

const c = Array.from({ length: 7 }, (_ /*current element*/, i) => i + 1);
console.log(c);

const diceRandom = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 6)
);
console.log(diceRandom);

// Array exercises

const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov > 0)
  .reduce((acc, curr) => acc + curr);

// const bankDepositSum = accounts
//   .map(account => account.movements)
//   .flat()
//   .reduce((acc, curr) => acc + curr);

console.log(bankDepositSum);

const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((acc, curr) => (curr >= 1000 ? ++acc : acc), 0);

console.log(numDeposits1000);

// const numDeposits1000 = accounts
//   .flatMap(account => account.movements)
//   .reduce((acc, curr) => {
//     if (curr >= 1000) {
//       acc++;
//     }

//     return acc;
//   }, 0);

// console.log(numDeposits1000);

const totalDeposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((acc, curr) => {
    if (curr >= 1000) {
      acc += curr;
    }

    return acc;
  });

console.log(totalDeposits1000);

const sums = accounts
  .flatMap(account => account.movements)
  .reduce(
    (acc, curr) => {
      // curr > 0 ? (acc.deposits += curr) : (acc.withdrawals += curr);

      acc[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// const sums = accounts
//   .flatMap(account => account.movements)
//   .reduce(
//     (acc, curr) => {
//       curr > 0 ? (acc.deposits += curr) : (acc.withdrawals += curr);
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sums);

//this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/////////////////////////////////////////////////

// Challenge 1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �
*/

function checkDogs(arr1, arr2) {
  const arrCopy = arr1.slice(1, -2);

  const allDogs = [...arrCopy, ...arr2];

  allDogs.forEach((dog, i) => {
    const phrase = `Dog ${i + 1} is ${dog > 3 ? 'an adult' : 'a puppy'}!`;
    console.log(phrase);
  });
}

checkDogs([3, 5, 2, 12, 7], [3, 5, 22, 12, 7]);

// Challenge 3
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �
*/

const calcAverageHumanAge = function (dogsAgesArr) {
  const humanAgeArray = dogsAgesArr
    .map(dogAge => {
      if (dogAge <= 2) return dogAge * 2;
      return dogAge * 4 + 16;
    })
    .filter(humanAge => humanAge >= 18);
  //  .reduce((acc, age, i, arr) => (acc + age) / arr.length, 0);

  const humanAgeAverage =
    humanAgeArray.reduce((acc, age) => acc + age) / humanAgeArray.length;
  console.log(humanAgeAverage);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]));

// Challenge 4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:

1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

function recommendedFoodPortion(weight) {
  return weight ** 0.75 * 28;
}
dogs.forEach(
  dog =>
    (dog['recommendedFood'] = Math.trunc(recommendedFoodPortion(dog.weight)))
);

console.log(dogs);

/*
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) �
*/

const amountFood = dog => {
  if (dog.curFood > 1.1 * dog.recommendedFood) {
    return 'too much';
  } else if (dog.curFood < 0.9 * dog.recommendedFood) {
    return 'too little';
  } else return 'ok';
};

const FindDog = (arr, name) => {
  const dog = arr.filter(dog => dog['owners'].includes(name));

  console.log(`${name}'s dog is eating ${amountFood(...dog)}`);
};

FindDog(dogs, 'Michael');
FindDog(dogs, 'Sarah');
FindDog(dogs, 'Matilda');
FindDog(dogs, 'Alice');

// const sarahsDog = dogs.filter(dog => dog['owners'].includes('Sarah') && dog);

// const amountFood = function (dog) {
//   if (dog.curFood > 1.1 * dog.recommendedFood) {
//     return 'too much';
//   } else if (dog.curFood < 0.9 * dog.recommendedFood) {
//     return 'too little';
//   } else return 'ok';
// };

// console.log(`Sarah's dog is eating ${amountFood(...sarahsDog)}`);

/*
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
*/
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > 1.1 * dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < 0.9 * dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log('too much', ownersEatTooMuch);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much`);

/*
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
*/

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

const okAmountFood = dog =>
  dog.curFood <= 1.1 * dog.recommendedFood &&
  dog.curFood >= 0.9 * dog.recommendedFood;

console.log(dogs.some(dog => okAmountFood(dog)));

const okDog = dogs.filter(dog => okAmountFood(dog));
console.log(okDog);

const shallowDogs = [...dogs].sort(
  (a, b) => a.recommendedFood - b.recommendedFood
);
console.log(dogs);
console.log(shallowDogs);
/*
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects �)
The Complete JavaScript Course 26
Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
 const dogs = [
 { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
 { weight: 8, curFood: 200, owners: ['Matilda'] },
 { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
 { weight: 32, curFood: 340, owners: ['Michael'] },
 ];
GOOD LUCK �
*/

//Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
//Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
