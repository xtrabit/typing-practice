const writeData = (user, data) => {
  return dispatch => {
    return fetch(`/write/${user}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .catch(err => {
        // add data to temp holding here until able to write
        console.error(err)
      });
  };
};

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default writeData;
