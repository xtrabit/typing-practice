const setUser = (user  = 'anonymous') => {
  return {
    type: 'SET_USER',
    user
  };
};

export default setUser;
