'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-05-20T18:49:59.371Z',
    '2022-05-22T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // ms * sec * min * hour

  const daysPassed = Math.round(calcDaysPassed(new Date(), date));
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  /*
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
  */

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMov = formatCur(mov, account.locale, account.currency);

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
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
  displayMovements(account);

  //Display Balance
  calcPrintBalance(account);

  //Display Summary
  calcDisplaySummary(account);
};

const startLogOutTimer = function () {
  const tick = function () {
    // in each call, print the remaining time to UI
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Decrease 1 sec
    time--;
  };

  // Set time to 5 min
  let time = 5 * 60;

  // call the timer every second
  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

//Event Handlers
let currentAccount, timer;

/*
//Fake always logged in
currentAccount = account2;
updateUI(currentAccount);
containerApp.style.opacity = 100;
*/

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

    //Create current date and time
    /*
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const minute = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minute}`;
    */
    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'numeric', // numeric, long, 2-digit
      year: 'numeric', // numeric, 2-digit
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'short', // short, long, narrow
    };

    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

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
    //Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add movement date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
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

// Parsing - try to get rid of the non numeric character, but needs to start with a number
console.log(Number.parseInt('30px', 10)); // where 10 is the numeric system we are using
console.log(Number.parseInt('30px', 2)); // where 2(binary) is the numeric system we are using
console.log(Number.parseInt('e30px')); //Nan

console.log('Float');
console.log(Number.parseFloat('2,5rem')); //it only works if it is a . and not a ,
console.log(Number.parseFloat('2.5rem')); //it only works if it is a . and not a ,
console.log(Number.parseInt('2.5rem'));

// isNaN tries to convert the argument to a number
console.log('not a number');
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0)); //Infinity is a special value in JS

// As isFinite will not try to convert the argument to a Number, it can be a better option to check is it is a number or not
console.log('finite');
console.log(Number.isFinite(23 / 0)); //Infinity is a special value in JS
console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
console.log(Number.isFinite('23X'));
console.log(Number.isFinite(+'20')); //plus will convert it to number before being evaluated

// isInteger
console.log('integer');
console.log(Number.isInteger(23 / 0)); //Infinity is a special value in JS
console.log(Number.isInteger(23));
console.log(Number.isInteger('23'));
console.log(Number.isInteger('23X'));
console.log(Number.isInteger(+'20')); //plus will convert it to number before being evaluated

//square root and cubicle root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

//Math.max does type coersion
console.log(Math.max(5, 8, 23, '11'));

//Math.min does type coersion
console.log(Math.min(5, 8, 23, '11'));

// calculate the area of the circle with a radius (10px in this case)
console.log(Math.PI * Number.parseFloat('10px') ** 2);

//random
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(9, 11));

//rounding integers - all this methods do **type coersion**
//Math.trunc: removes any decimal part
console.log('Math.trunc');
console.log(Math.trunc(2.5));
console.log(Math.trunc(2.4));
console.log(Math.trunc(2.9));

//Math.round: rounds to the nearest integer
console.log('Math.round');
console.log(Math.round(2.9));
console.log(Math.round(2.5));
console.log(Math.round(2.4));

//Math.ceil
console.log('Math.ceil');
console.log(Math.ceil(2.9));
console.log(Math.ceil(2.5));
console.log(Math.ceil(2.4));

//Math.floor
console.log('Math.floor');
console.log(Math.floor(2.9));
console.log(Math.floor(2.5));
console.log(Math.floor(2.4));

//Rounding decimals
//toFixed will always return a string and not a number
console.log('toFixed');
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

//Remainder operator
console.log('Remainder operator');
console.log(5 % 2);
console.log(5 / 2);
console.log(8 % 3);
console.log(8 / 3);

const isEven = num => num % 2 === 0;
console.log(isEven(10));
console.log(isEven(15));

//Numeric Separators: the underscore can be used at any place to separate the number (millions, cents)
const diameter = 2874600000000;
const diameterSeparator = 2_874_600_000_000;
console.log(diameter);
console.log(diameterSeparator);

const priceCents = 345_99;
console.log(priceCents);

const fee = 1_500;
console.log(fee);

//cons PI = 3._1415 error

//Big int
// Math operators dont work with bigints
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 - 1);
console.log('Number', 8741071075107580570750750917557918705710);
console.log('BigInt', 8741071075107580570750750917557918705710n);
console.log(BigInt(8989080980995710));

console.log('BigInt sum', 874107107510758057n + 750750917557918705710n);
/*
console.log(
  'BigInt multiplication',
  874107107510758057750750917557918705710n * 2
); error: Big int can't be mixed with regular numbers
*/

console.log(
  'BigInt multiplication',
  874107107510758057750750917557918705710n * 2n
);

console.log('BigInt comparison', 874107107510758057n > 100);
console.log('BigInt triple equality', 100n === 100); //different primitive types
console.log('BigInt equality', 100n == 100); //different primitive types
console.log(typeof 20n);

console.log('BigInt division', 10n / 2n);
console.log('BigInt division', 10n / 3n); //cuts off the decimal part
console.log('number division', 10 / 3); //cuts off the decimal part

// Create a date

const rightNow = new Date();
console.log(rightNow);

console.log(new Date('Aug 02 2021 18:05:40'));
console.log(new Date('December 24, 2015'));
console.log(new Date(2037, 10, 19, 15, 23, 5)); //months start at 0 position, 10 = november
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(0)); // The beginning of Unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //converting to ms

console.log(rightNow.getFullYear());
console.log(rightNow.getMonth());
console.log(rightNow.getDate());
console.log(rightNow.getDay());
console.log(rightNow.getHours());
console.log(rightNow.getMinutes());
console.log(rightNow.getSeconds());
console.log(rightNow.toISOString());
console.log(rightNow.getTime()); // time since the beginning of the unix time
console.log(new Date(1653159719035));

console.log(Date.now());

rightNow.setFullYear(2040);
console.log(rightNow);

/* 
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // ms * sec * min * hour

const days1 = calcDaysPassed(new Date(2037, 3, 24), new Date(2037, 3, 14));
console.log(days1);

Moment.js library for precise dates
*/

//Internationalizing Numbers (Intl)

const num = 389565445.23;

const options = {
  style: 'unit', //unit, percentage, currency
  unit: 'celsius', // MDN documentation for more (ie mile-per-hour)
  //currency: 'EUR'
  //useGrouping: false
};

console.log(new Intl.NumberFormat(navigator.language, options).format(num));
console.log(new Intl.NumberFormat('tr-TR', options).format(num));
console.log(new Intl.NumberFormat('pt-BR', options).format(num));
console.log(new Intl.NumberFormat('de-DE', options).format(num));
console.log(new Intl.NumberFormat('en-CA', options).format(num));

//setTimeout
setTimeout(() => console.log('Burdayim abi'), 2000);

setTimeout(
  (argumentA, argumentB) => console.log('Burdayim abi', argumentA, argumentB),
  2000,
  'argument1',
  'argument2'
);

const argumentsUsed = ['a', 'b'];
const timeoutExample = setTimeout(
  (argumentA, argumentB) => console.log('Burdayim abi', argumentA, argumentB),
  2000,
  ...argumentsUsed
);

if (argumentsUsed.includes('b')) clearTimeout(timeoutExample);

//setInterval

setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  //console.log(`${hour}:${min}:${sec}`);
}, 1000);
