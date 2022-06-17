'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//Object.freeze() will make the object immutable by not allowing it to change on first level, deep freeze can be obtained with third part libraries
budget[0].value = 1999;
console.log(budget);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

spendingLimits.Jay = 200;
console.log(spendingLimits); //there was not change in the object

//This function has the side effect of changing data that is outside of the scope of the change
/*
const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  
  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
*/

//we should always pass the data the function depends on into the function, and the function should not mutate it - create a copy and return it

const getLimit = (limits, user) => limits?.[user] ?? 0;

//Pure Function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, cleanUser }]
    : state;
};

//Compose and chaining would be use in real world Fucntional applications
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);
console.log(budget);

const check = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};

/*
const check = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
*/

const finalBudget = check(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, maxLimit) {
  /*
  const bigExpenses = state
    .filter(entry => entry.value <= -maxLimit)
    .map(entry => entry.description.slice(-2))
    .join('/');
    */
  const bigExpenses = state
    .filter(entry => entry.value <= -maxLimit)
    .reduce(
      (str, cur) =>
        str === ''
          ? `${cur.description.slice(-2)}`
          : `${str} / ${cur.description.slice(-2)}`,
      ''
    );

  console.log(bigExpenses);
};

console.log(budget);
logBigExpenses(finalBudget, 1000);
logBigExpenses(finalBudget, 100);
