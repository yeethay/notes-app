import rootReducer from ".";
import * as types from "../actions/types";

describe("root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      loggedIn: undefined,
      notesList: [],
      currentNoteIndex: 0
    });
  });

  it("should update auth state", () => {
    expect(
      rootReducer(undefined, {
        type: types.UPDATE_AUTH_STATE,
        authState: { loggedIn: true }
      })
    ).toEqual({ loggedIn: true, notesList: [], currentNoteIndex: 0 });

    expect(
      rootReducer(undefined, {
        type: types.UPDATE_AUTH_STATE,
        authState: { loggedIn: false }
      })
    ).toEqual({ loggedIn: false, notesList: [], currentNoteIndex: 0 });
  });
});
