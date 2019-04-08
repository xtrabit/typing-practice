const clearTracker = tracker => {
  return {
    type: 'CLEAR_TRACKER',
    tracker
  };
};

export default clearTracker;
