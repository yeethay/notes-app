import * as actions from ".";
import * as types from "./types";

describe('actions', () => {
  it('should create an action to update auth state', () => {
    const payload = { type: types.UPDATE_AUTH_STATE, loggedIn: true };
    const expectedAction = {
      type: types.UPDATE_AUTH_STATE,
      payload,
    }
    expect(actions.updateAuthStateAction(payload)).toEqual(expectedAction);
  });
});
