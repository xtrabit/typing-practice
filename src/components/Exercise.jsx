import React from 'react';
import {loadTest} from './loadTest';
import {letters} from './charSet';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: [],
      index: 0,
      test: false,
      clear: false,
      data: [],
      oldData: []
    };
    this.delay = 0;
    this.start = 0;
    this.end = 0;

    this.startExercise = this.startExercise.bind(this);
    this.displayPressedKey = this.displayPressedKey.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({oldData: this.props.data}, () => {
        this.calcWpm();

      });
    }
  }

  startExercise() {
    const test = loadTest(this.state.data, this.state.oldData);
    this.setState({testString: test, index: 0});
    this.clearExercise();

    if (!this.state.test) {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      this.setState({test: true, clear: false});
    }
  }

  handleKeyUp(e) {
    this.start = new Date();

  }

  handleKeyDown(e) {
    let index = this.state.index;
    if (index === this.state.testString.length) {
      this.clearExercise();
      this.startExercise();
      return;
    }
    const pressedKey = e.key;
    const expectedKey = this.state.testString[index];
    let letter = document.getElementById('index' + this.state.index + expectedKey);

    if (pressedKey === 'Escape') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      this.setState({test: false});
    }

    this.end = new Date();
    this.delay = this.end - this.start;
    console.log('CURRENT KEY [', pressedKey, '] transition time - ', this.delay);

    letters.includes(pressedKey) && this.displayPressedKey(pressedKey);

    if (pressedKey === expectedKey) {
      letter.className = letter.className === 'missed'
        ? letter.className = 'error'
        : letter.className = 'hit';

      index++;
      this.setState({index: index}, () => {
        this.saveKey();
      });
      pressedKey === ' ' && this.calcWpm(100);

      if (index !== this.state.testString.length) {
        const cursor = this.state.testString[index];
        letter = document.getElementById('index' + index + cursor);
        letter.className = 'cursor';
      }
    } else {
      letter.className = 'missed';
    }

  }

  calcWpm(max) {
    if (!this.state.data.length) {
      let sample = this.state.oldData;
      if (sample.length > max) {
        sample = sample.slice(sample.length - max);
      }
      let count = 0;
      let sum = sample.reduce((acc, item) => {
        if (item.delay <= 1000) {
          count++;
          acc += item.delay;
        }
        return acc;
      }, 0);
      let ave = count / (sum / 60000);
      var wpm = Number.parseFloat((ave / 5).toFixed(1));
    } else {
      let sample = this.state.data;
      if (sample.length > max) {
        sample = sample.slice(sample.length - max);
      }
      let count = 0;
      let sum = sample.reduce((acc, item) => {
        if (item.delay <= 1000) {
          count++;
          acc += item.delay;
        }
        return acc;
      }, 0);
      let ave = count / (sum / 60000);
      var wpm = Number.parseFloat((ave / 5).toFixed(1));
    }
    this.props.setWpm(wpm);
  }

  saveKey() {
    let {index, testString} = this.state;
    index--;
    if (index > 0 && index < testString.length) {
      const className = document.getElementById('index' + index + testString[index]).className;
      let key = {};
      key.letter = testString[index];
      key.after = testString[index - 1];
      key.delay = className === 'error' || this.delay > 1000 ? 1000 : this.delay;
      key.time = new Date();
      let data = [...this.state.data];
      data.push(key);
      this.setState({data: data}, () => {
        if (index === testString.length - 1) {
          this.writeData();
        }
      });
    }
  }

  writeData() {
    this.props.writeData(this.state.data);
  }

  displayPressedKey(key) {
    let pressed = document.getElementById(key);
    let className = pressed.className;
    if (!className.includes('pressed')) {
      pressed.className = className + ' pressed';
      setTimeout(() => {
        pressed.className = className;
      }, 250);
    }
  }

  displayString(render) {
    if (!render) return null;
    return this.state.testString.map((item, i) => {
      return <span
        key={'k' + item + i}
        id={'index' + i + item}
        className={i === 0 ? 'cursor' : 'regular'}
        >
        {item}
        </span>
    });
  }

  clearExercise() {
    this.setState({clear: true}, () => {
      this.setState({clear: false});
    });
  }

  render() {
    return (
      <div className='exercise-wrapper'>
        <div id='exercise' className='exercise' onClick={this.startExercise} >
          {this.displayString(!this.state.clear)}
        </div>
      </div>
    );
  }
}

export default Exercise;
