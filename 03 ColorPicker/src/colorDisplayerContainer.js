import { connect } from 'react-redux';
import ColorDisplayer from './colorDisplayer';

const mapStateToProps = state => (
  {
    color: state.userProfileReducer.favouriteColor,
  }
);

const mapDispatchToProps = () => (
  {}
);

const ColorDisplayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorDisplayer);

export default ColorDisplayerContainer;
