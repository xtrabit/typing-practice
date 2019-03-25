import React from 'react';

class QuickStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='quickstats-wrapper'>
        <h2>WPM: {this.props.wpm}</h2>
      </div>
    );
  }
}

export default QuickStats;
