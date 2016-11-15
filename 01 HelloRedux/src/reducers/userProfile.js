class UserProfileState {
  constructor() {
    this.firstname = 'Default name';
  }
}

const userProfileReducer = (state = new UserProfileState()) => (
  state
);

export default userProfileReducer;
