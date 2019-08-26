import * as actionTypes from "../actions/types";
import initialValue from "../components/editor/initialValue";

const initialState = {
  loggedIn: undefined,
  notesList: [],
  currentNoteIndex: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_AUTH_STATE: {
      return { ...state, loggedIn: action.authState.loggedIn };
    }

    case actionTypes.ADD_NEW_NOTE: {
      let newNotesList = [...state.notesList];
      for (let i = 0; i < newNotesList.length; i++) {
        newNotesList[i].active = false;
      }
      let newNoteId = state.notesList.length;
      newNotesList.push({
        title: "",
        preview: "",
        value: initialValue,
        active: true,
        id: newNoteId
      });

      return {
        ...state,
        notesList: newNotesList,
        currentNoteIndex: newNoteId
      };
    }

    case actionTypes.SET_NOTE_ACTIVE: {
      let newNotesList = [...state.notesList];
      let noteIndex;
      for (let i = 0; i < newNotesList.length; i++) {
        if (newNotesList[i].id === action.noteId) {
          newNotesList[i].active = true;
          noteIndex = i;
        } else {
          newNotesList[i].active = false;
        }
      }

      return { ...state, notesList: newNotesList, currentNoteIndex: noteIndex };
    }

    case actionTypes.SET_ACTIVE_NOTE_VALUE: {
      let newNotesList = [...state.notesList];
      for (let i = 0; i < newNotesList.length; i++) {
        if (newNotesList[i].active) {
          newNotesList[i].value = action.value;
          let text = action.value.toJSON().document.nodes[0].nodes[0].text;
          newNotesList[i].preview = text;
          break;
        }
      }
      return { ...state, notesList: newNotesList };
    }

    case actionTypes.SET_NOTE_TITLE: {
      let newNotesList = [...state.notesList];
      newNotesList[state.currentNoteIndex].title = action.title;
      return { ...state, notesList: newNotesList };
    }

    case actionTypes.SET_SAVED_NOTES: {
      return {...state, notesList: action.notesList};
    }

    default:
      return state;
  }
}

export default rootReducer;
