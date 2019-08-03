import rootReducer from ".";
import * as types from "../actions/types";

describe("root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({ loggedIn: false, });
  });

  it("should update auth state", () => {
    expect(rootReducer(undefined, {
      type: types.UPDATE_AUTH_STATE,
      payload: { loggedIn: true },
    })).toEqual({ loggedIn: true });

    expect(rootReducer(undefined, {
      type: types.UPDATE_AUTH_STATE,
      payload: { loggedIn: false },
    })).toEqual({ loggedIn: false });
  });

});
