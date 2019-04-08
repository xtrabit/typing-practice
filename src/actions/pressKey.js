const pressKey = key => {
  return {
    type: 'PRESS_KEY',
    pressed: key
  };
};

export default pressKey;
