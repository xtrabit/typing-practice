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
    this.startExercise = this.startExercise.bind(this);
  }

  startExercise() {
    // let node = document.getElementById('exercise');
    // console.log('NODE ', node)
    // node.innerHTML = '';
    const test = loadTest(this.props.data);
    this.setState({testString: test, index: 0});
    let time = 0;
    let start = 0;
    let end = 0;
    let current = null;

    const handleKey = (e) => {
      if (this.state.next && e.type === 'keydown') {
        this.setState({next: false});
        this.startExercise();
        return;
      }
      let index = this.state.index;
      const key = e.key;
      if (key === 'Escape') {
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('keyup', handleKey);
        this.setState({test: false});
      }
      if  (e.type === 'keyup') {
        start = new Date();
        console.log('key press time - ', start - end)
      } else if (e.type === 'keydown') {
        end = new Date();
        time = end - start;
        console.log('transition time - ', time);
        if (letters.includes(key)) {
          current = document.getElementById(key);
          current.style.cssText = `background-color: ${this.state.colorPressed}`;
          ((c) => {
            setTimeout(() => {
              c.style.cssText = `background-color: ${this.state.colorNormal}`;
            }, 250);
          })(current);
        }
        console.log('CURRENT KEY - ', key)
        let correctKey = this.state.testString[this.state.index];
        let letter = document.getElementById('index' + this.state.index + correctKey);
        console.log('index: ', this.state.index, '; key: ', key, '; expected key: ', correctKey)
        if (key === this.state.testString[this.state.index]) {
          letter.className = 'used';
          // letter.style.cssText = `background-color: ${this.state.colorUsed}`;
          index++;
          if (index === this.state.testString.length) {
            this.setState({next: true});
            return;
          }
          correctKey = this.state.testString[index];
          letter = document.getElementById('index' + index + correctKey);
          letter.className = 'cursor';
          this.setState({index: index});
        } else {
          console.log('index - ', index)
          letter.className = 'mistake';
        }
      }
    };
    if (!this.state.test) {
      window.addEventListener('keydown', handleKey.bind(this));
      window.addEventListener('keyup', handleKey.bind(this));
      this.setState({test: true});
    }
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
