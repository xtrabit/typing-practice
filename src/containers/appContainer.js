import App from '../components/App';
import { connect } from 'react-redux';
import pressKey from '../actions/pressKey';
import depressKey from '../actions/depressKeyTimeout';

const mapStateToProps = state => {
  return {
    pressedKeys: state.pressedKeys
  };
};

const mapDispatchToProps = dispatch => {
  return {
    press: (key) => dispatch(pressKey(key)),
    depress: (key) => dispatch(depressKey(key))
  };
};

const appContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default appContainer;
