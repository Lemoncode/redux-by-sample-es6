class UserProfileState {
  constructor() {
    this.firstname = 'Default name';
  }
}

// eslint-disable-next-line no-unused-vars
const userProfileReducer = (state = new UserProfileState(), action) => (
  state
);

export default userProfileReducer;
