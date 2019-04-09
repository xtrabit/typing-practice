const calcWpm = (sample, max = 100) => {
    let wpm = 0;
    if (sample.length) {
      if (sample.length > max) {
        sample = sample.slice(sample.length - max);
      }
      let count = 0;
      const sum = sample.reduce((acc, item) => {
        count++;
        acc += item.delay;
        return acc;
      }, 0);
      const ave = count / (sum / 60000);
      wpm = Number.parseFloat((ave / 5).toFixed(1));
    }
    return wpm;
  }

  module.exports  = {
    calcWpm
  };
