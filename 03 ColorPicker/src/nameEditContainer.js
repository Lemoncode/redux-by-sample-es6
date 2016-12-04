import { connect } from 'react-redux';
import NameEditComponent from './nameEdit';
import updateUserProfileName from './actions/updateUserProfileName';

const mapStateToProps = state => (
  {
    userName: state.userProfileReducer.firstname,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onChange: name => (
      dispatch(updateUserProfileName(name))
    ),
  }
);

const HelloWorldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NameEditComponent);

export default HelloWorldContainer;
