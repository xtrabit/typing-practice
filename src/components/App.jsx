import React from 'react';
import './styles.css';
import Board from './Board';
import Exercise from './Exercise';

import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'anonymous',
      data: null,
      wpm: 0
    };
    this.loadData = this.loadData.bind(this);
    this.writeData = this.writeData.bind(this);
    this.setWpm = this.setWpm.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch(`/load/${this.state.user}`)
      .then(res => res.json())
      .then(res => {
        console.log('LOADED DATA - ', res);
        res[0] === 'empty' ? this.setState({data: null}) : this.setState({data: res});
      })
      .catch(err => console.error(err));
  }

  writeData(data, cb) {
    fetch(`/write/${this.state.user}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => cb())
      .catch(err => console.error(err));
    const newData = [...this.state.data].concat(data);
    this.setState({data: newData});
  }

  setWpm(wpm) {
    this.setState({wpm});
  }

  render() {
    return (
      <div className='app-wrapper'>
        <Header
          user={this.state.user}
          wpm={this.state.wpm}
        />
        <Exercise
          data={this.state.data}
          user={this.state.user}
          loadData={this.loadData}
          writeData={this.writeData}
          setWpm={this.setWpm}
        />
        <Board />
      </div>
    );
  }
}

export default App;
