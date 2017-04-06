// app.js
var math = require('./mathlib')();
// console.log(math);
var result = 0;

// addition
result = math.add(2,3);
console.log("add",result);

// multiply
result = math.multiply(3,5);
console.log("multiply",result);

// square
result = math.square(5);
console.log("square",result);

// random
result = math.random(1,35);
console.log("random",result);
