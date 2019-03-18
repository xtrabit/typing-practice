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
      data: []
    };
    this.delay = 0;
    this.start = 0;
    this.end = 0;

    this.startExercise = this.startExercise.bind(this);
    this.displayPressedKey = this.displayPressedKey.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  startExercise() {
    const test = loadTest(this.props.data);
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
        this.saveData();
      });

      if (index !== this.state.testString.length) {
        const cursor = this.state.testString[index];
        letter = document.getElementById('index' + index + cursor);
        letter.className = 'cursor';
      }
    } else {
      letter.className = 'missed';
    }

  }

  saveData() {
    let {index, testString} = this.state;
    index--;
    if (index > 0 && index < testString.length) {
      const className = document.getElementById('index' + index + testString[index]).className;
      let key = {};
      key.letter = testString[index];
      key.after = testString[index - 1];
      key.delay = className === 'error' ? 1 : this.delay;
      key.time = new Date();
      let data = [...this.state.data];
      data.push(key);
      this.setState({data: data}, () => {
        if (index === testString.length - 1) {
          this.writeData();
        }
      });
    }
    // if (index === testString.length && this.state.data.length) {
    //   console.log()
    //   this.writeData();
    // }
  }

  writeData() {
    this.props.writeData(this.state.data);
  }

  displayPressedKey(key) {
    let pressed = document.getElementById(key);
    let className = pressed.className;
    pressed.className = className + ' pressed';
    setTimeout(() => {
      pressed.className = className;
    }, 250);
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
