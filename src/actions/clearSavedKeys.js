const clearSavedKeys = key => {
  return {
    type: 'CLEAR_KEYS',
    key
  };
};

export default clearSavedKeys;
