const exerciseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE':
      return action.exercise;
    case 'CLEAR_EXERCISE':
      return [];
    default:
      return state;
  }
};

export default exerciseReducer;