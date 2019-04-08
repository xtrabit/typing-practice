const updateTracker = (category, index) => {
  return {
    type: 'UPDATE_TRACKER',
    tracker: {
      category,
      index
    }
  };
};

export default updateTracker;
