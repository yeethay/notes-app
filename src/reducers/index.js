import * as types from '../actions/types';
import initialValue from '../components/editor/initialValue';

const initialState = {
  user: null,
  notesList: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER: {
      return { ...state, user: action.user };
    }

    case types.ADD_NEW_NOTE: {
      let newNotesList = [...state.notesList];
      for (let i = 0; i < newNotesList.length; i++) {
        newNotesList[i].active = false;
      }
      let newNoteId = state.notesList.length;
      newNotesList.push({
        title: '',
        preview: '',
        value: initialValue,
        active: true,
        id: newNoteId,
      });

      return {
        ...state,
        notesList: newNotesList,
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

      return {
        ...state,
        notesList: newNotesList,
      };
    }

    case types.SET_ACTIVE_NOTE_VALUE: {
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

    case types.SET_NOTE_TITLE: {
      let newNotesList = [...state.notesList];
      let currentNote = newNotesList.find(note => note.active);
      newNotesList[currentNote.id].title = action.title;
      return { ...state, notesList: newNotesList };
    }

    case types.STORE_NOTES_LIST: {
      return { ...state, notesList: action.notesList };
    }

    default:
      return state;
  }
}

export default rootReducer;
