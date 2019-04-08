import changeData from './changeData';

const loadData = user => {
  return dispatch => {
    return fetch(`/load/${user}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const data = json[0] === 'empty' ? null : json;
        dispatch(changeData(data));
      })
      .catch(err => console.error(err));
  };
};

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export default loadData;
