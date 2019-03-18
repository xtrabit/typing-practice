import React from 'react';
import {loadTest} from './loadTest';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPressed: 'lightgreen',
      colorNormal: 'none',
      testString: ''
    };
    this.letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.startExercise = this.startExercise.bind(this);
  }

  startExercise() {
    const test = loadTest(this.props.data);
    this.setState({testString: test});
    let time = 0;
    let start = 0;
    let end = 0;
    let current = null;
    const handleKey = (e) => {
      const key = e.key;
      console.log(e.type);
      console.log(key);
      if (key === 'Escape') {
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('keyup', handleKey);
      }
      if  (e.type === 'keyup') {
        start = new Date();
        console.log('key press time - ', start - end)
      } else if (e.type === 'keydown') {
        end = new Date();
        time = end - start;
        console.log('transition time - ', time);
        if (this.letters.includes(key)) {
          current = document.getElementById(key);
          current.style.cssText = `background-color: ${this.state.colorPressed}`;
          ((c) => {
            setTimeout(() => {
              c.style.cssText = `background-color: ${this.state.colorNormal}`;
            }, 250);
          })(current);
        }
      }
    };

    console.log('add event listner')
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);
  }

  render() {
    return (
      <div className='exercise-wrapper'>
        <div className='exercise' onClick={this.startExercise}>

        </div>
      </div>
    );
  }
}

export default Exercise;
