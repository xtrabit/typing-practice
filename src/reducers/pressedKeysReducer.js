import Redux from 'redux';

const pressedKeysReducer = (state = null, action) => {
  switch (action.type) {
    case 'PRESS_KEY':
      return {...state, [action.pressed]: state[action.pressed] > 0 ? ++state[action.pressed] : 1};

    case 'DEPRESS_KEY':
      return {...state, [action.depressed]: (state[action.depressed] > 0 ? --state[action.depressed] : 0)};

    default:
      return state;
  }
};

export default pressedKeysReducer;
