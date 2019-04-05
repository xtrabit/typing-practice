const bigrams = require('./bigrams');
const {normalized, sample} = require('./lettersFrequency');

const assembleString = (qty) => {
  const counter = createCounter(qty);
  const exercise = getExerciseSrting(counter, qty, 250);
  return exercise;
};

const createCounter = (qty) => {
  const counter = sample.slice(0);
  let count = 0;
  let rowMax = 1;
  while (count < qty) {
    for (let i = 0; i < normalized.length; i++) {
      if (normalized[i][1] >= rowMax && count < qty) {
        counter[i][1] = rowMax;
        count++;
      } else {
        break;
      }
    }
    rowMax++;
  }
  return counter;
};

const getGroup = (sequence = ['LR', 'RR', 'RL', 'LL']) => {
  const index = ~~(Math.random() * bigrams.all.length);
  const pair = bigrams.all[index][0];
  const choice = bigrams.all[index][2];
  const score = bigrams.all[index][1];
  const seqIndex = sequence.indexOf(choice);
  const newSequenceStart = sequence.slice(seqIndex);
  const newSequenceEnd = sequence.slice(0, seqIndex);
  const newSequence = newSequenceStart.concat(newSequenceEnd);
  const result = {};
  result.group = newSequence;
  result.pair = pair;
  result.score = score;
  return result;
};

const getExerciseSrting = (counter, count, maxTime) => {
  const tracker = counter.reduce((acc, item) => {
    acc[item[0]] = item[1];
    return acc;
  }, {});
  // const {group, pair} = getGroup(['LR', 'RL']);
  let {group, pair, score} = getGroup(['LL', 'LR', 'RR', 'RL']);
  // let {group, pair, score} = getGroup(['LL', 'LL', 'LR', 'RR', 'RR', 'RL']);
  // const {group, pair} = getGroup(['LL', 'LL', 'LL', 'LR', 'RR', 'RR', 'RR', 'RL']);
  const groupIndex = 1;
  const exercise = [pair[0], pair[1]];
  const maxFound = exercise.slice();
  count -= 2;
  tracker[pair[0]]--;
  tracker[pair[1]]--;
  const startTime = new Date();
  const nextChar = getNextChar(startTime, maxTime, group, groupIndex, tracker, count, exercise, maxFound, score, score);
  console.log('max score - ', nextChar[2]);
  console.log('ave - ', ~~(nextChar[2] / nextChar[1].length))
  return nextChar[1];
};

const getNextChar = (startTime, maxTime, group, groupIndex, tracker, count, exercise, maxFound, score, maxScore) => {
  const time = new Date() - startTime;
  if (time > maxTime || count === 0) return [true, maxFound, maxScore];

  tracker = Object.create(tracker);
  exercise = exercise.slice();
  const bigram = bigrams[group[groupIndex]];
  const lastChar = exercise[exercise.length - 1];
  const loopStart = ~~(Math.random() * bigram.length);
  const difference = (bigram.length - loopStart);

  for (let c = 0; c < bigram.length; c++) {
    const i = c < difference ? loopStart + c : c - difference;
    const bigramFirst = bigram[i][0][0];
    const bigramLast = bigram[i][0][1];
    const bigramScore = bigram[i][1];
    score = bigramScore + score;

    if (bigramFirst === lastChar && tracker[bigramLast] > 0) {
      exercise.push(bigramLast);
      count--;
      groupIndex = groupIndex === group.length - 1 ? 0 : groupIndex + 1;
      tracker[bigramLast]--;
      if (score > maxScore) {
        maxFound = exercise;
        maxScore = score;
      }
      let nextChar = getNextChar(startTime, maxTime, group, groupIndex, tracker, count, exercise, maxFound, score, maxScore);
      if (nextChar[2] > maxScore) {
        maxFound = nextChar[1];
        maxScore = nextChar[2];
      }
      if (nextChar[0] === true) {
        return [true, maxFound, maxScore];
      } else {
        exercise.pop();
        count++;
        groupIndex = groupIndex === 0 ? group.length - 1 : groupIndex - 1;
        tracker[bigramLast]++;
        score = score - bigramScore;
      }
    }
  }
  return [false, maxFound, maxScore];
};

module.exports = assembleString;
