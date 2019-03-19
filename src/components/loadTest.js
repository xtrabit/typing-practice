const {letters} = require('./charSet.js');

const loadTest = (data) => {
  if (!data.length) {
    return generateString(letters);
  }
  const sample = arrangeByKey(data);
  let keys = extractKeys(sample);
  keys = compensateSet(keys, 26);
  // console.log('SORTED AFTER', keys);
  const half = keys.slice(~~(keys.length / 2));
  console.log(half);
  return generateString(half);
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
  if (keys.includes('')) keys.splice(keys.indexOf(''), 1);
  return keys;
};

const sort = (list) => {
  const sortedList = [];
  let sorted = false;
  let min = Infinity;
  let temp;
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < list.length; i++) {
      if (list[i].value < min) {
        min = list[i].value;
        temp = i;
      }
    }
    if (min !== Infinity) {
      sortedList.push(list[temp]);
      min = Infinity;
      list.splice(temp, 1);
      sorted = false;
    }
  }
  return sortedList;
};

const sortByKeyTimes = (data) => {

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
  let list = extractKeyTimes(sample);
  list = averageKeyTimes(list);
  return sort(list);
};

const generateString = (letters) => {
  const min = 3;
  const max = 7;
  const str = [];
  const length = 43;
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
