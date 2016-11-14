import actionsEnums from '../common/actionsEnums';

const updateUserProfileName = newName => (
  {
    type: actionsEnums.UPDATE_USERPROFILE_NAME,
    newName,
  }
);

export default updateUserProfileName;
