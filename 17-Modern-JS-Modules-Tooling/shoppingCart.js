// Export module
console.log('export');

const cart = [];
const shippingCost = 10;

// export const addToCart = function (product, qtt) {
//   cart.push({ product, qtt });
//   console.log(`${qtt} unit(s) of ${product} added to the cart`);
// };

const addToCart = function (product, qtt) {
  cart.push({ product, qtt });
  console.log(`${qtt} unit(s) of ${product} added to the cart`);
};

console.log(cart);

export { cart, shippingCost };

export default addToCart;
