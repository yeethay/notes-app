import rootReducer from ".";
import * as actions from "../actions";
import initialValue from "../utils/slate/initialValue";

describe("root reducer", () => {
  it("should return the initial state", () => {
    let initialState = {
      loggedIn: undefined,
      notesList: [],
      currentNoteIndex: 0
    };
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it("should update auth state", () => {
    let initialState = {
      loggedIn: undefined,
      notesList: [],
      currentNoteIndex: 0
    };
    expect(
      rootReducer(
        initialState,
        actions.updateAuthStateAction({ loggedIn: true })
      )
    ).toEqual({ ...initialState, loggedIn: true });

    expect(
      rootReducer(
        initialState,
        actions.updateAuthStateAction({ loggedIn: false })
      )
    ).toEqual({ ...initialState, loggedIn: false });
  });

  it("should add a new note when none exist", () => {
    let initialState = {
      loggedIn: undefined,
      notesList: [],
      currentNoteIndex: 0
    };
    let newState = rootReducer(initialState, actions.addNewNoteAction());

    expect(newState.notesList.length).toEqual(1);
    expect(newState.notesList[0]).toEqual({
      title: "",
      preview: "",
      value: initialValue,
      active: true,
      id: 0
    });
  });

  it("should add a new note when there is already an existing one", () => {
    let initialState = {
      notesList: [
        {
          title: "",
          preview: "",
          value: initialValue,
          active: true,
          id: 0
        }
      ]
    };
    let newState = rootReducer(initialState, actions.addNewNoteAction());

    expect(newState.notesList.length).toEqual(2);
    expect(newState.notesList).toEqual([
      {
        title: "",
        preview: "",
        value: initialValue,
        active: false,
        id: 0
      },
      {
        title: "",
        preview: "",
        value: initialValue,
        active: true,
        id: 1
      }
    ]);
  });

  it("should set a note active", () => {
    let initialState = {
      notesList: [{ active: true, id: 0 }, { active: false, id: 1 }],
      currentNoteIndex: 0
    };

    let expectedState = {
      notesList: [{ active: false, id: 0 }, { active: true, id: 1 }],
      currentNoteIndex: 1
    };
    expect(rootReducer(initialState, actions.setNoteActiveAction(1))).toEqual(
      expectedState
    );
  });

  it("should change the title of a note", () => {
    let initialState = {
      notesList: [{ title: "Before", id: 0 }],
      currentNoteIndex: 0
    };

    let expectedState = {
      notesList: [{ title: "After", id: 0 }],
      currentNoteIndex: 0
    };

    expect(
      rootReducer(initialState, actions.setNoteTitleAction("After"))
    ).toEqual(expectedState);
  });
});
