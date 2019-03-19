const {letters} = require('./charSet.js');

const loadTest = (data, old) => {
  if (!data.length && !old.length) {
    return generateString(letters);
  }
  const sample = makeSample(data, old);
  // console.log('LOAD TEST SAMPLE --- ', sample);
  let sorted = arrangeByKey(sample);
  sorted = sorted.map((item) => {
    return item.key;
  });
  if (sorted.includes(' ')) sorted.splice(sorted.indexOf(' '));
  // console.log('SORTED BEFORE', sorted);
  if (sorted.length < 26) {
    let needed = 26 - sorted.length;
    const extracted = letters.reduce((acc, item) => {
      if (!sorted.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
    while (needed > 0) {
      const index = ~~(Math.random() * extracted.length);
      sorted.unshift(extracted[index]);
      extracted.splice(index, 1);
      needed--;
    }
  }
  console.log('SORTED AFTER', sorted);
  const half = sorted.slice(~~(sorted.length / 2));
  console.log(half);
  return generateString(half);
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

const arrangeByKey = (data) => {
  let sample;
  if (data.length > 1000) {
    sample = data.slice(data.length - 1000);
  } else {
    sample = data;
  }
  const list = sample.reduce((acc, item) => {
    if (!acc[item.letter]) {
      acc[item.letter] = [item.delay];
    } else {
      acc[item.letter].push(item.delay);
    }
    return acc;
  }, {});
  const extracted = [];
  for (let key in list) {
    if (key === '') continue;
    if (list[key].length > 10) {
      list[key] = list[key].slice(list[key].length - 10);
    }
    let sum = 0;
    for (let i = 0; i < list[key].length; i++) {
      sum += list[key][i];
    }
    list[key] = sum / list[key].length;
    const obj = {};
    obj.key = key;
    obj.value = list[key];
    extracted.push(obj);
  }


  return sort(extracted);
  // return list;
};

const makeSample = (data, old) => {
  // console.log(data)
  // console.log(old)
  let sample = [];
  if (data.length < 201 && old.length) {
    const index = data.length;
    sample = old.slice(old.length - (201 - index)).concat(data);
  } else if (data.lenght > 200) {
    sample = data.slice(data.length - 200);
  } else if (data.length < 201 && !old.length) {
    sample = data;
  }
  // console.log('MAKE SAMPLE -- ', sample);
  return sample;
};


const stringFromData = (data) => {

};

const makeTest = (data) => {

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
  // str = ['a', 'b', ' ', 'c', 'd', ' ', 'e', ' '];
  return str;
};


module.exports = {
  loadTest
};
