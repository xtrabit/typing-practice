import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div>
        <h2>what's up</h2>
      </div>
    );
  }
}

export default App;