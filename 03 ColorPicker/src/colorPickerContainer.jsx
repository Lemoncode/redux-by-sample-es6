import { connect } from 'react-redux';
import ColorPicker from './colorPicker';
import updateFavouriteColor from './actions/updateFavouriteColor';

const mapStateToProps = state => (
  {
    color: state.userProfileReducer.favouriteColor,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onColorUpdated: color => (
      dispatch(updateFavouriteColor(color))
    ),
  }
);

const ColorPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPicker);

export default ColorPickerContainer;
