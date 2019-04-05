import React from 'react';
import {loadTest} from '../lib/loadTest';
import {letters} from '../lib/charSet';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: [],
      index: 0,
      test: false,
      clear: false,
      data: [],
      loadedData: []
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
      this.setState({loadedData: this.props.data}, () => {
        this.calcWpm();

      });
    }
  }

  startExercise() {
    const test = loadTest(this.state.loadedData);
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
    let {index, testString} = this.state;
    if (index === testString.length) {
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
      this.setState({index}, () => {
        this.saveKey();
      });
      pressedKey === ' ' && this.calcWpm();

      if (index !== this.state.testString.length) {
        const cursor = this.state.testString[index];
        letter = document.getElementById('index' + index + cursor);
        letter.className = 'cursor';
      }
    } else {
      letter.className = 'missed';
    }
  }

  calcWpm() {
    const max = 100;
    let sample = this.state.loadedData;
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
    this.props.setWpm(wpm);
  }

  saveKey() {
    let {index, testString} = this.state;
    index--;
    if (index > 0 && index < testString.length) {
      const className = document.getElementById('index' + index + testString[index]).className;
      const key = {};
      key.letter = testString[index];
      key.after = testString[index - 1];
      key.delay = className === 'error' || this.delay > 1000 ? 1000 : this.delay;
      key.time = new Date();
      const data = [...this.state.data];
      data.push(key);
      this.setState({data}, () => {
        if (index === testString.length - 1) {
          this.writeData();
        }
      });
    }
  }

  writeData() {
    this.props.writeData(this.state.data, () => {
      this.setState({data: []});
    });
  }

  displayPressedKey(key) {
    const pressed = document.getElementById(key);
    const {className} = pressed;
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
      return (
        <span
          key={'k' + item + i}
          id={'index' + i + item}
          className={i === 0 ? 'cursor' : 'regular'}
        >
          {item}
        </span>
      )
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
        <div id='exercise' className='exercise' onClick={this.startExercise}>
          {this.displayString(!this.state.clear)}
        </div>
      </div>
    );
  }
}

export default Exercise;
