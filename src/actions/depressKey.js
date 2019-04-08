const depressKey = key => {
  return {
    type: 'DEPRESS_KEY',
    depressed: key
  };
};

export default depressKey;
