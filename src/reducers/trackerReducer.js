const trackerReducer = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_TRACKER':
      return ['cursor'];
    case 'UPDATE_TRACKER':
      const { category, index } = action.tracker;
      let newState = [...state];
      newState[index] = category;
      return newState;
    default:
      return state;
  }
};

export default trackerReducer;