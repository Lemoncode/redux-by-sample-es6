import actionsEnums from '../common/actionsEnums';

const objectAssign = require('object-assign');

class UserProfileState {
  constructor() {
    this.firstname = 'Default name';
    this.favouriteColor = { red: 0, green: 0, blue: 180 };
  }
}

const handleUserProfileAction = (state, action) => {
  const newState = objectAssign({}, state, { firstname: action.newName });
  return newState;
};

const handleFavouriteColorAction = (state, action) => {
  const newState = objectAssign({}, state, { favouriteColor: action.newColor });
  return newState;
};

const userProfileReducer = (state = new UserProfileState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    case actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR:
      return handleFavouriteColorAction(state, action);
    default:
  }
  return state;
};

export default userProfileReducer;
