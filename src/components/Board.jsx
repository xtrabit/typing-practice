import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='board-wrapper'>
        <div id='tilde' className='board-key three-qtr'><p>&#126;<br/>&#96;</p></div>
        <div id='one' className='board-key full'><p>!<br/>1</p></div>
        <div id='two' className='board-key full'><p>&#64;<br/>2</p></div>
        <div id='three' className='board-key full'><p>&#35;<br/>3</p></div>
        <div id='four' className='board-key full'><p>&#36;<br/>4</p></div>
        <div id='five' className='board-key full'><p>&#37;<br/>5</p></div>
        <div id='six' className='board-key full'><p>&#94;<br/>6</p></div>
        <div id='seven' className='board-key full'><p>&#38;<br/>7</p></div>
        <div id='eight' className='board-key full'><p>&#42;<br/>8</p></div>
        <div id='nine' className='board-key full'><p>&#40;<br/>9</p></div>
        <div id='zero' className='board-key full'><p>&#41;<br/>0</p></div>
        <div id='hyphen' className='board-key full'><p>&#95;<br/>&#45;</p></div>
        <div id='equal' className='board-key full'><p>&#43;<br/>&#61;</p></div>
        <div id='bsp' className='board-key full-qtr'><div>Bsp</div></div>

        <div id='tab' className='board-key full-qtr'>Tab</div>
        <div id='q' className='board-key full'>Q</div>
        <div id='w' className='board-key full'>W</div>
        <div id='e' className='board-key full'>E</div>
        <div id='r' className='board-key full'>R</div>
        <div id='t' className='board-key full'>T</div>
        <div id='y' className='board-key full'>Y</div>
        <div id='u' className='board-key full'>U</div>
        <div id='i' className='board-key full'>I</div>
        <div id='o' className='board-key full'>O</div>
        <div id='p' className='board-key full'>P</div>
        <div id='lsqbr' className='board-key full'><p>&#123;<br/>&#91;</p></div>
        <div id='rsqbr' className='board-key full'><p>&#125;<br/>&#93;</p></div>
        <div id='bslash' className='board-key three-qtr'><p>&#124;<br/>&#92;</p></div>

        <div id='caps' className='board-key full-half'>Caps</div>
        <div id='a' className='board-key full'>A</div>
        <div id='s' className='board-key full'>S</div>
        <div id='d' className='board-key full'>D</div>
        <div id='f' className='board-key full'>F</div>
        <div id='g' className='board-key full'>G</div>
        <div id='h' className='board-key full'>H</div>
        <div id='j' className='board-key full'>J</div>
        <div id='k' className='board-key full'>K</div>
        <div id='l' className='board-key full'>L</div>
        <div id='semicolon' className='board-key full'><p>&#58;<br/>&#59;</p></div>
        <div id='apostrophe' className='board-key full'><p>&#34;<br/>&#39;</p></div>
        <div id='enter' className='board-key full-half'>Enter</div>

        <div id='lshift' className='board-key double'>Shift</div>
        <div id='z' className='board-key full'>Z</div>
        <div id='x' className='board-key full'>X</div>
        <div id='c' className='board-key full'>C</div>
        <div id='v' className='board-key full'>V</div>
        <div id='b' className='board-key full'>B</div>
        <div id='n' className='board-key full'>N</div>
        <div id='m' className='board-key full'>M</div>
        <div id='lthan' className='board-key full'><p>&#60;<br/>&#44;</p></div>
        <div id='gthan' className='board-key full'><p>&#62;<br/>&#46;</p></div>
        <div id='slash' className='board-key full'><p>&#63;<br/>&#47;</p></div>
        <div id='rshift' className='board-key double'>Shift</div>

        <div id='lctrl' className='board-key full'>Ctrl</div>
        <div id='fn' className='board-key full'>Fn</div>
        <div id='sp' className='board-key full'>Sp</div>
        <div id='lalt' className='board-key full'>Alt</div>
        <div id='space' className='board-key quintuple'>Space</div>
        <div id='ralt' className='board-key full'>Alt</div>
        <div id='rctrl' className='board-key full'>Ctrl</div>
        <div id='left' className='board-key full'>&larr;</div>
        <div id='updn' className='board-key full'><p>&uarr;<br/>&darr;</p></div>
        <div id='right' className='board-key full'>&rarr;</div>
      </div>
    );
  }
}

export default Board;
