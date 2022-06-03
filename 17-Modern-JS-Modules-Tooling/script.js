// Import module
/*
import { addToCart, cart, shippingCost as shipping } from './shoppingCart.js';

console.log('import');
addToCart('banana', 3);

console.log(cart);
console.log(shipping);
*/

/*
import * as shoppingCart from './shoppingCart.js';

console.log('import');
shoppingCart.addToCart('banana', 3);
shoppingCart.addToCart('oranges', 5);

console.log(shoppingCart.cart);
console.log(shoppingCart.shippingCost);
*/

//It is not desirable to mix 2 types of import
/*
import add, { cart, shippingCost } from './shoppingCart.js';

add('melon', 5);
console.log(cart);
*/

import add from './shoppingCart.js';

add('melon', 5);

/* Top level await
es 2020: you can use await keyword outside an async function in modules (<script type=module>)
it will block the rest of the code while is awating
*/

const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = await getLastPost();
//const lastPost = getLastPost().then(last => console.log(last)); //same result using regular promises
console.log(lastPost);

/*
if one module imports a module that uses top level await, the import module will need to wait until the promise from the other module is fulfilled
*/

//IIFE immediately-invoked function expression

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 20;
  const totalPrice = 237;
  const totalQtt = 23;

  const addToCart = function (product, qtt) {
    cart.push({ product, qtt });
    console.log(`${qtt} ${product} added to cart`);
  };

  const orderStock = function (product, qtt) {
    console.log(`${qtt} ${product} ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQtt,
  };
})();

console.log(shoppingCart2);
shoppingCart2.addToCart('apples', 4);
console.log(shoppingCart2.cart);

/*
// common js modules: it only works on nodejs

export.addToCartCommon = function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}

// import
const {addToCartCommon} = require('./shoppinCart.js')
*/

/* 
Command line shortcuts

cd ../..
cd nameOfTheFolder
ls(mac) === dir(windows)
clear ctrl+k(vscode)
mkdir nameOfTheNewFolder
touch nameOfFile.js nameOfAnotherFile.js
rm nameOfFile.js
mv nameOfTheFileToMove.js ../nameOfTheFolderToMoveTo
rmdir nameOfEmptyFolder
rm -R nameOfFolder //in case there are files inside the directory
*/

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//import cloneDeep from 'lodash-es'; //parcel
//import cloneDeep from 'lodash'; //parcel

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'banana', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateCopy = Object.assign({}, state);

const stateDeepClone = cloneDeep(state);

stateCopy.user.loggedIn = false;
console.log(stateCopy);
console.log(state);
console.log(stateDeepClone);

//Bundling with Parcel and NPM scripts
//module.hot.accept = whenever we change a module, it will be injected in the code without triggering a new build
