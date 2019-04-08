const saveKeyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_KEY':
      return [...state, action.key];
    default:
      return state;
  }
};

export default saveKeyReducer;
