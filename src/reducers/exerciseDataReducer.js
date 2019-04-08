const exerciseDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_DATA':
      return action.data;
    case 'ADD_DATA':
      return [...state, ...action.data];
    default:
      return state;
  }
};

export default exerciseDataReducer;
