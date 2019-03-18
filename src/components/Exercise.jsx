import React from 'react';
import {loadTest} from './loadTest';
import {letters} from './charSet';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPressed: 'lightgreen',
      colorNormal: 'none',
      colorUsed: '#DEB887',
      testString: [],
      index: 0,
      test: false,
      next: false
    };
    this.time = 0;
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

    if (!this.state.test) {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
      this.setState({test: true});
    }
  }

  handleKeyUp(e) {
    this.start = new Date();
    console.log('key press time - ', this.start - this.end)
  }

  handleKeyDown(e) {
    const pressedKey = e.key;
    if (pressedKey === 'Escape') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
      this.setState({test: false});
    }
    if (this.state.next) {
        this.setState({next: false});
        this.startExercise();
        return;
      }
    let index = this.state.index;
    this.end = new Date();
    this.time = this.end - this.start;
    console.log('transition time - ', this.time);
    if (letters.includes(pressedKey)) {
      this.displayPressedKey(pressedKey);
    }
    console.log('CURRENT KEY - ', pressedKey)
    let expectedKey = this.state.testString[this.state.index];
    let letter = document.getElementById('index' + this.state.index + expectedKey);
    console.log('index: ', this.state.index, '; key: ', pressedKey, '; expected key: ', expectedKey)
    if (pressedKey === this.state.testString[this.state.index]) {
      letter.className = 'used';
      index++;
      if (index === this.state.testString.length) {
        this.setState({next: true});
        return;
      }
      expectedKey = this.state.testString[index];
      letter = document.getElementById('index' + index + expectedKey);
      letter.className = 'cursor';
      this.setState({index: index});
    } else {
      console.log('index - ', index)
      letter.className = 'mistake';
    }
  }

  displayPressedKey(key) {
    console.log('KEY: ', key);
    let pressed = document.getElementById(key);
    console.log('PRESSED: ', pressed);
    pressed.style.cssText = `background-color: ${this.state.colorPressed}`;
    setTimeout(() => {
      pressed.style.cssText = `background-color: ${this.state.colorNormal}`;
    }, 250);
  }

  displayString(flag) {
    if (!flag) return null;
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

  render() {
    return (
      <div className='exercise-wrapper'>
        <div id='exercise' className='exercise' onClick={this.startExercise} >
          {this.displayString(this.state.test)}
        </div>
      </div>
    );
  }
}

export default Exercise;
