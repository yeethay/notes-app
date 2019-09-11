import * as actionTypes from '../actions/types';
import initialValue from '../components/editor/initialValue';

const initialState = {
  loggedIn: undefined,
  notesList: [],
  currentNoteIndex: 0,
  titlesList: [],
  editor: undefined
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
        value: initialValue,
        preview: '',
        active: true,
        id: newNoteId,
      });

      let newTitlesList = [...state.titlesList];
      for (let i = 0; i < newTitlesList.length; i++) {
        newTitlesList[i].active = false;
      }
      newTitlesList.push({
        title: '',
        active: true,
        id: newNoteId
      });
      return {
        ...state,
        titlesList: newTitlesList,
        notesList: newNotesList,
        currentNoteIndex: newNoteId,
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

      let newTitlesList = [...state.titlesList];
      for (let i = 0; i < newTitlesList.length; i++) {
        if (newTitlesList[i].id === action.noteId) {
          newTitlesList[i].active = true;
        } else {
          newTitlesList[i].active = false;
        }
      }

      return { ...state, titlesList: newTitlesList, notesList: newNotesList, currentNoteIndex: noteIndex };
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
      let newTitlesList = [...state.titlesList];
      newTitlesList[state.currentNoteIndex].title = action.title;
      return { ...state, titlesList: newTitlesList };
    }

    case actionTypes.SET_SAVED_NOTES: {
      let newTitlesList = [];
      let newCurrentIndex;
      for (let i = 0; i < action.notesList.length; i++) {
        newTitlesList.push({
          title: '',
          active: action.notesList[i].active,
          id: i
        });
        if (action.notesList[i].active) {
          newCurrentIndex = i;
        }
      }

      return {...state, titlesList: newTitlesList, notesList: action.notesList, currentNoteIndex: newCurrentIndex};
    }

    case actionTypes.STORE_EDITOR: {
      return {...state, editor: action.editor};
    }

    default:
      return state;
  }
}

export default rootReducer;
