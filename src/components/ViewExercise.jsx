import React from 'react';

const ViewExercise = ({ exercise, tracker }) => {
  return exercise.map((item, i) => {
    return (
      <span
        key={'k' + item + i}
        id={'index' + i + item}
        className={tracker[i] ? tracker[i] : 'regular'}
      >
        {item}
      </span>
    )
  });
}

export default ViewExercise;
