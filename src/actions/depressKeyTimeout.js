import depressKey from './depressKey';

const depressKeyTimeout = key => {
  return dispatch => {
      setTimeout(() => dispatch(depressKey(key)), 250);
  };
};

export default depressKeyTimeout;
