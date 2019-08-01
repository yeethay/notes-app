import * as types from "../actions/types";

const initialState = {
  loggedIn: undefined,
  notesList: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_AUTH_STATE: {
      return { ...state, loggedIn: action.authState };
    }

    case types.ADD_NEW_NOTE: {
      let newNotesList = [...state.notesList];
      for (let i = 0; i < newNotesList.length; i++) {
        newNotesList[i].active = false;
      }
      newNotesList.push({
        title: "Untitled note",
        preview: "",
        active: true,
        id: state.notesList.length
      });

      return {
        ...state,
        notesList: newNotesList
      };
    }

    case types.SET_NOTE_ACTIVE: {
      let newNotesList = [...state.notesList];
      for (let i = 0; i < newNotesList.length; i++) {
        if (newNotesList[i].id === action.noteId) {
          newNotesList[i].active = true;
        } else {
          newNotesList[i].active = false;
        }
      }

      return { ...state, notesList: newNotesList };
    }

    default:
      return state;
  }
}

export default rootReducer;
