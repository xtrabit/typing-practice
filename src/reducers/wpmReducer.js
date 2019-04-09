const wpmReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_WPM':
      return action.wpm;
    default:
      return state;
  }
};

export default wpmReducer;
