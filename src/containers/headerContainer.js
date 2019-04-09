import Header from '../components/Header';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    wpm: state.wpm,
    user: state.user
  };
};

const headerContainer = connect(
  mapStateToProps,
  null
)(Header);

export default headerContainer;
