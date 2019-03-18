import React from 'react';
import QuickStats from './QuickStats';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.loadStats = this.loadStats.bind(this);
  }

  loadStats() {
    fetch(`/load/${this.props.user}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res[0] === 'empty' ? this.setState({data: null}) : this.setState({data: res});
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='header-wrapper'>
        <QuickStats />
        <div className='user-wrapper'>
          <p className='user-name'>{this.props.user}</p>
          <p className='options' onClick={this.loadStats}>&#183; &#183; &#183;</p>
        </div>
      </div>
    );
  }
}

export default Header;
