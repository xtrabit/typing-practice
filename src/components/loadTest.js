const {letters} = require('./charSet.js');

const loadTest = (data) => {
  console.log(data);
  return generateString();
};

const generateString = () => {
  let min = 3;
  let max = 7;
  let str = [];
  let length = 15;
  let total = 0;
  while(total < length) {
    let qty = ~~(Math.random() * (max - min + 1) + min);
    for (let i = 0; i < qty; i++) {
      let index = ~~(Math.random() * letters.length);
      str.push(letters[index]);
      total++;
    }
    str.push(' ');
    total++;
  }
  str.pop();
  str = ['a', 'b', ' ', 'c', 'd', ' ', 'e', ' '];
  return str;
};

module.exports = {
  loadTest
};