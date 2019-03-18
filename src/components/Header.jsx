import React from 'react';
import QuickStats from './QuickStats';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // this.setState({})
  }

  render() {
    return (
      <div className='header-wrapper'>
        <QuickStats wpm={this.props.wpm} />
        <div className='user-wrapper'>
          <p className='user-name'>{this.props.user}</p>
          <p className='options' onClick={() => {}}>&#183; &#183; &#183;</p>
        </div>
      </div>
    );
  }
}

export default Header;
