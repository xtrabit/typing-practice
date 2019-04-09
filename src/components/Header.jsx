import React from 'react';

const Header = ({ wpm, user }) => (
  <div className='header-wrapper'>
    <div className='wpm-wrapper'>
      <h2>WPM: {wpm}</h2>
    </div>
    <div className='user-wrapper'>
      <p className='user-name'>{user}</p>
      <p className='options' onClick={() => {}}>&#183; &#183; &#183;</p>
    </div>
  </div>
);

export default Header;
