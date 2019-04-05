const {letters} = require('./charSet.js');
const assembleString = require('./initialTest.js');

const loadTest = (data) => {
  const max = 40;
  const test = assembleString(max);
  return generateTest(test);
};

const generateTest = (letters) => {
  console.log(letters)
  const min = 3;
  const max = 7;
  let str = [];
  const length = letters.length;
  let index = 0;
  let total = 0;

  let qty = 0;
  while (index < length) {
    const randomLength = ~~(Math.random() * (max - min + 1)) + min;
    const remainder = length - index;
    if (remainder >= min && remainder <= max) {
      str = str.concat(letters.slice(index));
      index = length;
      break;
    } else if (remainder - randomLength < min && randomLength > min) {
      str = str.concat(letters.slice(index, index + min + 1));
      index += min + 1;
    } else {
      str = str.concat(letters.slice(index, index + randomLength));
      index += randomLength;
    }
    str.push(' ');
  }
  return str;
};

module.exports = {
  loadTest
};
