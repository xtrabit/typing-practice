import { connect } from 'react-redux';
import Exercise from '../components/Exercise';
import pressKey from '../actions/pressKey';
import depressKey from '../actions/depressKeyTimeout';
import clearTracker from '../actions/clearTracker';
import updateTracker from '../actions/updateTracker';
import setExercise from '../actions/setExercise';
import clearExercise from '../actions/clearExercise';
import saveKey from '../actions/saveKey';

const mapStateToProps = state => {
  return {
    // pressedKeys: state.pressedKeys,
    exercise: state.exercise,
    tracker: state.tracker,
    keys: state.keys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    press: (key) => {
      dispatch(pressKey(key));
      dispatch(depressKey(key));
    },
    // depress: (key) => dispatch(depressKey(key)),
    clearTracker: () => dispatch(clearTracker()),
    updateTracker: (cat, ind) => dispatch(updateTracker(cat, ind)),
    setExercise: exe => dispatch(setExercise(exe)),
    clearExercise: () => dispatch(clearExercise()),
    saveKey: (key) => dispatch(saveKey(key))
  };
};

const exerciseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercise);

export default exerciseContainer;
