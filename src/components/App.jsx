import React from 'react';
import '../styles/styles.css';
import ViewBoard from './ViewBoard';
import Exercise from '../containers/exerciseContainer';
import listenToKeys from '../lib/listenToKeys';
import Header from '../containers/headerContainer';

const App = ({pressedKeys}) => (
  <div className='app-wrapper'>
    <Header />
    <Exercise listenToKeys={listenToKeys} />
    <ViewBoard pressedKeys={pressedKeys} />
  </div>
);

export default App;
