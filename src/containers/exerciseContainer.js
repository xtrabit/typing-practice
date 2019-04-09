import { connect } from 'react-redux';
import Exercise from '../components/Exercise';
import pressKey from '../actions/pressKey';
import depressKey from '../actions/depressKeyTimeout';
import clearTracker from '../actions/clearTracker';
import updateTracker from '../actions/updateTracker';
import setExercise from '../actions/setExercise';
import clearExercise from '../actions/clearExercise';
import saveKey from '../actions/saveKey';
import clearKeys from '../actions/clearSavedKeys';
import setUser from '../actions/setUser';
import loadData from '../actions/loadData';
import addData from '../actions/addData';
import writeData from '../actions/writeData';
import setWpm from '../actions/setWpm';

const mapStateToProps = state => {
  return {
    user: state.user,
    exercise: state.exercise,
    tracker: state.tracker,
    savedKeys: state.savedKeys,
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    press: (key) => {
      dispatch(pressKey(key));
      dispatch(depressKey(key));
    },
    clearTracker: () => dispatch(clearTracker()),
    updateTracker: (cat, ind) => dispatch(updateTracker(cat, ind)),
    setExercise: exe => dispatch(setExercise(exe)),
    clearExercise: () => dispatch(clearExercise()),
    saveKey: key => dispatch(saveKey(key)),
    setUser: user => dispatch(setUser(user)),
    loadData: user => dispatch(loadData(user)),
    addData: data => dispatch(addData(data)),
    clearData: data => dispatch(clearKeys()),
    writeData: (user, data) => dispatch(writeData(user, data)),
    setWpm: wpm => dispatch(setWpm(wpm))
  };
};

const exerciseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercise);

export default exerciseContainer;
