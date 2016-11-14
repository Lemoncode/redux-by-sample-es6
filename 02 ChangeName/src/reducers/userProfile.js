import actionsEnums from '../common/actionsEnums';

const objectAssign = require('object-assign');

class UserProfileState {
  constructor() {
    this.firstname = 'Default name';
  }
}

const handleUserProfileAction = (state, action) => {
  const newState = objectAssign({}, state, { firstname: action.newName });
  return newState;
};

const userProfileReducer = (state = new UserProfileState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    default:
  }
  return state;
};

export default userProfileReducer;
