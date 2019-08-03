import * as actions from ".";
import * as types from "./types";

describe("actions", () => {
  it("should create an action to update auth state", () => {
    const authState = {
      loggedIn: true
    };
    const expectedAction = {
      type: types.UPDATE_AUTH_STATE,
      authState
    };
    expect(actions.updateAuthStateAction(authState)).toEqual(expectedAction);
  });

  it("should create an action to add a new note", () => {
    const expectedAction = {
      type: types.ADD_NEW_NOTE
    };
    expect(actions.addNewNoteAction()).toEqual(expectedAction);
  });

  it("should create an action to set a note active", () => {
    let noteId = 0;
    const expectedAction = {
      type: types.SET_NOTE_ACTIVE,
      noteId
    };
    expect(actions.setNoteActiveAction(noteId)).toEqual(expectedAction);
  });
});
