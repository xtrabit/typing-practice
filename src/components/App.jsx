import React from 'react';
import './styles.css';
import Board from './Board';
import Exercise from './Exercise';
import QuickStats from './QuickStats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'anonymous'
    };
  }

  render() {
    return (
      <div className='app-wrapper'>
        <QuickStats />
        <Exercise />
        <Board />
      </div>
    );
  }
}

export default App;
