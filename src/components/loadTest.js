const {letters} = require('./charSet.js');
const assembleString = require('../exercise/initialTest.js');

const loadTest = (data) => {
  const max = 80;
  const test = assembleString(max);
  console.log(test);
  return test;

  if (!data.length) {
    return assembleString(max);
    // return generateString(letters, max);
  }
  let sample = arrangeByKey(data);
  // console.log('ARRANGED ------------------------------------------------------', sample)
  sample = sortByKeyTimes(sample);
  let keys = extractKeys(sample);
  keys = compensateSet(keys, 26);
  keys = keys.slice(16);
  console.log('KEYS - ', keys)
  // console.log('SLICED - ', sliced)
  let weighted = generateWeighted(keys, max);
  // console.log('WEIGHTED - ', weighted);
  // return weighted;

  // const half = keys.slice(~~(keys.length / 2));
  // console.log(half);

  return assembleString(max);
  // return generateTest(weighted);
};

const generateTest = (letters) => {
  let randomized = letters.slice(0);
  const min = 3;
  const max = 7;
  let str = [];
  const length = randomized.length;
  let total = 0;
  let qty = 0;

  for (let i = 0; i < length; i++) {
    let rnd = ~~(Math.random() * length);
    let temp = randomized[i];
    randomized[i] = randomized[rnd];
    randomized[rnd] = temp;
  }
  let done = false;
  let repeat = false;
  let count = 0;
  let pair = false;
  while (!done) {
    if (count > 100) break;
    count++;
    done = true;
    for (let i = 0; i < length - 1; i++) {
      if (randomized[i] === randomized[i + 1] && i < length - 3 && pair === true) {
        let temp = randomized[i + 1];
        randomized[i + 1] = randomized[i + 2];
        randomized[i + 2] = temp;
        done = false;
        pair = false;
      } else if (randomized[i] === randomized[i + 1] && pair === true) {
        let temp = randomized[i + 1];
        randomized[i + 1] = randomized[0];
        randomized[0] = temp;
        done = false;
        pair = false;
      } else if (randomized[i] === randomized[i + 1]) {
        pair = true;
      }
    }
  }
  let index = 0;
  while (index < length) {
    // console.log('INDEX - ', index, '; LENGTH - ', length, '; QTY - ', qty)
    // console.log('STR - ', str)
    qty = ~~(Math.random() * (max - min + 1) + min);
    let remainder = length - index;
    let nextRemainder = remainder - qty;
    if (remainder >= min && remainder <= max) {
      // console.log('END')
      str = str.concat(randomized.slice(index));
      index = length;
      break;
    }
    if (nextRemainder < min) {
      qty = qty - (min - nextRemainder);
    }

    str = str.concat(randomized.slice(index, index + qty));
    str.push(' ');
    index += qty;
  }
  str.pop();
    console.log('STR - ', str)
  return str;
};

module.exports = {
  loadTest
};

const generateWeighted = (data, length) => {
  let firstTierQty = ~~(length / 2) + 1;
  let thirdTierQty = ~~((length - firstTierQty) / 3)
  let secondTierQty = length - firstTierQty - thirdTierQty;
  let firstTierIndex = data.length - (~~(data.length / 3) + 0);
  let secondTierIndex = data.length - (data.length - firstTierIndex + ~~(data.length / 3) + 0);
  let exercise = [];
  const getChars = (letters, qty) => {
    // console.log('LETTERS - ', letters, '; QTY - ', qty)
    let result = [];
    while (result.length < qty) {
      let rand = ~~(Math.random() * letters.length);
      if (!result.includes(letters[rand])) {
        // console.log('DOESNT INCLUDE - ', letters[rand]);
        result.push(letters[rand]);
      } else if (result.length >= letters.length) {
        // console.log('INCLUDES >= LETTERS - ', letters[rand]);
        result.push(letters[rand]);
      }
      //  else if (qty >= letters.length) {
      //   console.log('INCLUDES QTY >= LETTERS - ', letters[rand]);
      //   result.push(letters[rand]);
      // }

    }
    return result;
  };
  exercise = getChars(data.slice(firstTierIndex), firstTierQty);
  exercise = exercise.concat(getChars(data.slice(secondTierIndex, firstTierIndex), secondTierQty));
  exercise = exercise.concat(getChars(data.slice(0, secondTierIndex), thirdTierQty));
  // console.log('EXERCISE - ', exercise);
  return exercise;
};

const compensateSet = (data, max) => {
  if (data.length < max) {
    let needed = max - data.length;
    const extracted = letters.reduce((acc, item) => {
      if (!data.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    while (needed > 0) {
      const index = ~~(Math.random() * extracted.length);
      data.unshift(extracted[index]);
      extracted.splice(index, 1);
      needed--;
    }
  }
  return data;
}

const extractKeys = (data) => {
  let keys = data.map((item) => {
    return item.key;
  });
  if (keys.includes(' ')) keys.splice(keys.indexOf(' '), 1);
  if (keys.includes('')) keys.splice(keys.indexOf(''), 1);
  return keys;
};

const sortByKeyTimes = (data) => {
  let sort = true;
  while (sort) {
    sort = false;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i + 1].value < data[i].value) {
        let temp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = temp;
        sort = true;
      }
    }
  }
  return data;
};

const extractKeyTimes = (data) => {
  return data.reduce((acc, item) => {
    if (!acc[item.letter]) {
      acc[item.letter] = [item.delay];
    } else {
      acc[item.letter].push(item.delay);
    }
    return acc;
  }, {});
};

const averageKeyTimes = (data) => {
  const averaged = [];
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    let item = data[keys[i]];
    if (item.length > 10) {
      item = item.slice(item.length - 10);
    }
    let sum = 0;
    for (let n = 0; n < item.length; n++) {
      sum += item[n];
    }
    item = sum / item.length;
    const obj = {};
    obj.key = keys[i];
    obj.value = item;
    averaged.push(obj);
  }
  return averaged;
};

const arrangeByKey = (data) => {
  const max = 200;
  let sample;
  if (data.length > max) {
    sample = data.slice(data.length - max);
  } else {
    sample = data;
  }
  const list = extractKeyTimes(sample);
  return averageKeyTimes(list);
};

const generateString = (letters, maxLength) => {
  const min = 3;
  const max = 7;
  const str = [];
  const length = maxLength;
  let total = 0;
  while (total < length) {
    const qty = ~~(Math.random() * (max - min + 1) + min);
    for (let i = 0; i < qty; i++) {
      const index = ~~(Math.random() * letters.length);
      str.push(letters[index]);
      total++;
    }
    str.push(' ');
    total++;
  }
  str.pop();
  return str;
};

module.exports = {
  loadTest
};
