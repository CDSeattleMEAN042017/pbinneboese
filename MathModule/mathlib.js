// mathlib.js
module.exports = function (){
  return {
    add: function(num1, num2) {
      return (num1 + num2);
    },
    multiply: function(num1, num2) {
      return (num1 * num2);
    },
    square: function(num) {
      return (num * num);
    },
    random: function(num1, num2) {  // return random between num1 & num2
      var value = Math.floor(Math.random() * (num2-num1+1)) + num1;
      return value;
    }
  }
};
