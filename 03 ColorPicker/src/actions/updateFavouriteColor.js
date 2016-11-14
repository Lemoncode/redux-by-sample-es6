import actionsEnums from '../common/actionsEnums';

const updateFavouriteColor = newColor => (
  {
    type: actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR,
    newColor,
  }
);

export default updateFavouriteColor;
