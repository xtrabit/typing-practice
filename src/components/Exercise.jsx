import React from 'react';
import { loadTest } from '../lib/loadTest';
import { letters } from '../lib/charSet';
import listenToKeys from '../lib/listenToKeys';
import ViewExercise from './ViewExercise';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testString: [],
      index: 0,
      test: false,
      data: [],
      loadedData: []
    };
    this.delay = 0;
    this.start = 0;
    this.end = 0;

    this.startExercise = this.startExercise.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.loadedData.length === 0) {
      this.props.loadData(this.props.user);
    }
    console.log('USER - ', this.props.user)
    console.log('LOADED - ', this.state.loadedData)
    console.log(this.props.tracker)
    console.log(this.props.savedKeys)
    if (prevProps.data !== this.props.data) {
      this.setState({loadedData: this.props.data}, () => {
        //this.calcWpm();

      });
    }
  }

  startExercise() {
    const test = loadTest();
    this.props.setExercise(test);
    this.props.clearTracker();
    this.setState({index: 0});

    if (!this.state.test) {
      listenToKeys.start(this.handleKeyDown, this.handleKeyUp)
      this.setState({test: true});
    }
  }

  handleKeyUp() {
    this.start = new Date();

  }

  handleKeyDown(e) {
    let {index} = this.state;
    let testString = this.props.exercise;
    if (index === testString.length) {
      this.startExercise();
      return;
    }
    const pressedKey = e.key;
    const expectedKey = testString[index];

    if (pressedKey === 'Escape') {
      listenToKeys.stop();
      this.setState({test: false});
      return;
    }

    this.end = new Date();
    this.delay = this.end - this.start;
    // console.log('CURRENT KEY [', pressedKey, '] transition time - ', this.delay);

    letters.includes(pressedKey) && this.props.press(pressedKey);
    if (pressedKey === expectedKey) {
      const category = this.props.tracker[index] === 'missed'
        ? 'error'
        : 'hit';
      this.props.updateTracker(category, index);

      index++;
      this.setState({index}, () => {
        this.saveKey();
      });
      pressedKey === ' ' && this.calcWpm();

      if (index !== testString.length) {
        const cursor = testString[index];
        this.props.updateTracker('cursor', index);
      }
    } else {
      this.props.updateTracker('missed', index);
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
    // this.props.setWpm(wpm);
  }

  saveKey() {
    let { index } = this.state;
    let testString = this.props.exercise;
    index--;
    if (index > 0 && index < testString.length) {
      const className = this.props.tracker[index];
      // const className = document.getElementById('index' + index + testString[index]).className;
      const key = {};
      key.letter = testString[index];
      key.after = testString[index - 1];
      key.delay = className === 'error' || this.delay > 1000 ? 1000 : this.delay;
      key.time = new Date();
      const data = [...this.state.data];
      data.push(key);
      console.log('SAVING ------------------------------------')
      this.props.saveKey(key)
      this.setState({data}, () => {
        if (index === testString.length - 1) {
          this.props.addData(this.props.savedKeys);
          this.props.writeData(this.props.user, this.props.savedKeys);
          this.props.clearData();
        }
      });
    }
  }

  writeData() {
    // this.props.writeData(this.state.data, () => {
    //   this.setState({data: []});
    // });
  }

  displayString(render) {
    if (!render) return null;
    return this.state.testString.map((item, i) => {
      return (
        <span
          key={'k' + item + i}
          id={'index' + i + item}
          className={//i === 0 ? 'cursor' : 'regular'
          this.props.tracker[i] ? this.props.tracker[i] : 'regular'
        }
        >
          {item}
        </span>
      )
    });
  }

  render() {
    return (
      <div className='exercise-wrapper'>
        <div id='exercise' className='exercise' onClick={this.startExercise}>
          <ViewExercise exercise={this.props.exercise} tracker={this.props.tracker} />
        </div>
      </div>
    );
  }
}

export default Exercise;
