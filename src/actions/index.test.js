import * as actions from ".";
import * as types from "./types";

describe("actions", () => {
  it("should create an action to update auth state", () => {
    const authState = {
      type: types.UPDATE_AUTH_STATE,
      loggedIn: true
    };
    const expectedAction = {
      type: types.UPDATE_AUTH_STATE,
      authState
    };
    expect(actions.updateAuthStateAction(authState)).toEqual(expectedAction);
  });
});
