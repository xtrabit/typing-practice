import React from 'react';

const ViewBoard = ({ pressedKeys }) => (
  <div className='board-wrapper'>
    <div id='tilde' className={`board-key three-qtr${(pressedKeys.tilde > 0 ? ' pressed' : '')}`}><p>&#126;<br />&#96;</p></div>
    <div id='one' className={`board-key full${(pressedKeys.one > 0 ? ' pressed' : '')}`}><p>!<br />1</p></div>
    <div id='two' className={`board-key full${(pressedKeys.two > 0 ? ' pressed' : '')}`}><p>&#64;<br />2</p></div>
    <div id='three' className={`board-key full${(pressedKeys.three > 0 ? ' pressed' : '')}`}><p>&#35;<br />3</p></div>
    <div id='four' className={`board-key full${(pressedKeys.four > 0 ? ' pressed' : '')}`}><p>&#36;<br />4</p></div>
    <div id='five' className={`board-key full${(pressedKeys.five > 0 ? ' pressed' : '')}`}><p>&#37;<br />5</p></div>
    <div id='six' className={`board-key full${(pressedKeys.six > 0 ? ' pressed' : '')}`}><p>&#94;<br />6</p></div>
    <div id='seven' className={`board-key full${(pressedKeys.seven > 0 ? ' pressed' : '')}`}><p>&#38;<br />7</p></div>
    <div id='eight' className={`board-key full${(pressedKeys.eight > 0 ? ' pressed' : '')}`}><p>&#42;<br />8</p></div>
    <div id='nine' className={`board-key full${(pressedKeys.nine > 0 ? ' pressed' : '')}`}><p>&#40;<br />9</p></div>
    <div id='zero' className={`board-key full${(pressedKeys.zero > 0 ? ' pressed' : '')}`}><p>&#41;<br />0</p></div>
    <div id='hyphen' className={`board-key full${(pressedKeys.hyphen > 0 ? ' pressed' : '')}`}><p>&#95;<br />&#45;</p></div>
    <div id='equal' className={`board-key full${(pressedKeys.equal > 0 ? ' pressed' : '')}`}><p>&#43;<br />&#61;</p></div>
    <div id='bsp' className={`board-key full-qtr${(pressedKeys.bsp > 0 ? ' pressed' : '')}`}><div>Bsp</div></div>

    <div id='tab' className={`board-key full-qtr${(pressedKeys.tab > 0 ? ' pressed' : '')}`}>Tab</div>
    <div id='q' className={`board-key full${(pressedKeys.q > 0 ? ' pressed' : '')}`}>Q</div>
    <div id='w' className={`board-key full${(pressedKeys.w > 0 ? ' pressed' : '')}`}>W</div>
    <div id='e' className={`board-key full${(pressedKeys.e > 0 ? ' pressed' : '')}`}>E</div>
    <div id='r' className={`board-key full${(pressedKeys.r > 0 ? ' pressed' : '')}`}>R</div>
    <div id='t' className={`board-key full${(pressedKeys.t > 0 ? ' pressed' : '')}`}>T</div>
    <div id='y' className={`board-key full${(pressedKeys.y > 0 ? ' pressed' : '')}`}>Y</div>
    <div id='u' className={`board-key full${(pressedKeys.u > 0 ? ' pressed' : '')}`}>U</div>
    <div id='i' className={`board-key full${(pressedKeys.i > 0 ? ' pressed' : '')}`}>I</div>
    <div id='o' className={`board-key full${(pressedKeys.o > 0 ? ' pressed' : '')}`}>O</div>
    <div id='p' className={`board-key full${(pressedKeys.p > 0 ? ' pressed' : '')}`}>P</div>
    <div id='lsqbr' className={`board-key full${(pressedKeys.lsqbr > 0 ? ' pressed' : '')}`}><p>&#123;<br />&#91;</p></div>
    <div id='rsqbr' className={`board-key full${(pressedKeys.rsqbr > 0 ? ' pressed' : '')}`}><p>&#125;<br />&#93;</p></div>
    <div id='bslash' className={`board-key three-qtr${(pressedKeys.bslash > 0 ? ' pressed' : '')}`}><p>&#124;<br />&#92;</p></div>

    <div id='caps' className={`board-key full-half${(pressedKeys.a > 0 ? ' pressed' : '')}`}>Caps</div>
    <div id='a' className={`board-key full${(pressedKeys.a > 0 ? ' pressed' : '')}`}>A</div>
    <div id='s' className={`board-key full${(pressedKeys.s > 0 ? ' pressed' : '')}`}>S</div>
    <div id='d' className={`board-key full${(pressedKeys.d > 0 ? ' pressed' : '')}`}>D</div>
    <div id='f' className={`board-key full${(pressedKeys.f > 0 ? ' pressed' : '')}`}>F</div>
    <div id='g' className={`board-key full${(pressedKeys.g > 0 ? ' pressed' : '')}`}>G</div>
    <div id='h' className={`board-key full${(pressedKeys.h > 0 ? ' pressed' : '')}`}>H</div>
    <div id='j' className={`board-key full${(pressedKeys.j > 0 ? ' pressed' : '')}`}>J</div>
    <div id='k' className={`board-key full${(pressedKeys.k > 0 ? ' pressed' : '')}`}>K</div>
    <div id='l' className={`board-key full${(pressedKeys.l > 0 ? ' pressed' : '')}`}>L</div>
    <div id='semicolon' className={`board-key full${(pressedKeys.semicolon > 0 ? ' pressed' : '')}`}><p>&#58;<br />&#59;</p></div>
    <div id='apostrophe' className={`board-key full${(pressedKeys.apostrophe > 0 ? ' pressed' : '')}`}><p>&#34;<br />&#39;</p></div>
    <div id='enter' className={`board-key full-half${(pressedKeys.enter > 0 ? ' pressed' : '')}`}>Enter</div>

    <div id='lshift' className={`board-key double${(pressedKeys.lshift > 0 ? ' pressed' : '')}`}>Shift</div>
    <div id='z' className={`board-key full${(pressedKeys.z > 0 ? ' pressed' : '')}`}>Z</div>
    <div id='x' className={`board-key full${(pressedKeys.x > 0 ? ' pressed' : '')}`}>X</div>
    <div id='c' className={`board-key full${(pressedKeys.c > 0 ? ' pressed' : '')}`}>C</div>
    <div id='v' className={`board-key full${(pressedKeys.v > 0 ? ' pressed' : '')}`}>V</div>
    <div id='b' className={`board-key full${(pressedKeys.b > 0 ? ' pressed' : '')}`}>B</div>
    <div id='n' className={`board-key full${(pressedKeys.n > 0 ? ' pressed' : '')}`}>N</div>
    <div id='m' className={`board-key full${(pressedKeys.m > 0 ? ' pressed' : '')}`}>M</div>
    <div id='lthan' className={`board-key full${(pressedKeys.lthan > 0 ? ' pressed' : '')}`}><p>&#60;<br />&#44;</p></div>
    <div id='gthan' className={`board-key full${(pressedKeys.gthan > 0 ? ' pressed' : '')}`}><p>&#62;<br />&#46;</p></div>
    <div id='slash' className={`board-key full${(pressedKeys.slash > 0 ? ' pressed' : '')}`}><p>&#63;<br />&#47;</p></div>
    <div id='rshift' className={`board-key double${(pressedKeys.rshift > 0 ? ' pressed' : '')}`}>Shift</div>

    <div id='lctrl' className={`board-key full${(pressedKeys.lctrl > 0 ? ' pressed' : '')}`}>Ctrl</div>
    <div id='fn' className={`board-key full${(pressedKeys.fn > 0 ? ' pressed' : '')}`}>Fn</div>
    <div id='sp' className={`board-key full${(pressedKeys.sp > 0 ? ' pressed' : '')}`}>Sp</div>
    <div id='lalt' className={`board-key full${(pressedKeys.lalt > 0 ? ' pressed' : '')}`}>Alt</div>
    <div id='space' className={`board-key quintuple${(pressedKeys.space > 0 ? ' pressed' : '')}`}>Space</div>
    <div id='ralt' className={`board-key full${(pressedKeys.ralt > 0 ? ' pressed' : '')}`}>Alt</div>
    <div id='rctrl' className={`board-key full${(pressedKeys.rctrl > 0 ? ' pressed' : '')}`}>Ctrl</div>
    <div id='left' className={`board-key full${(pressedKeys.left > 0 ? ' pressed' : '')}`}>&larr;</div>
    <div id='updn' className={`board-key full${(pressedKeys.updn > 0 ? ' pressed' : '')}`}><p>&uarr;<br />&darr;</p></div>
    <div id='right' className={`board-key full${(pressedKeys.right > 0 ? ' pressed' : '')}`}>&rarr;</div>
  </div>
);

export default ViewBoard;
