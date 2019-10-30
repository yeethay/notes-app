import * as types from '../actions/types';
import initialValue from '../components/editor/initialValue';
import uuid from 'uuid/v4';

const initialState = {
  user: null,
  notesList: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER: {
      return { ...state, user: action.user };
    }

    case types.ADD_NEW_NOTE: {
      return {
        ...state,
        notesList: {
          ...Object.keys(state.notesList).reduce((result, key) => {
            result[key] = state.notesList[key];
            result[key].active = false;
            return result;
          }, {}),
          [uuid()]: {
            title: '',
            preview: '',
            value: initialValue,
            active: true,
          },
        },
      };
    }

    case types.SET_NOTE_ACTIVE: {
      return {
        ...state,
        notesList: {
          ...Object.keys(state.notesList).reduce((result, key) => {
            result[key] = state.notesList[key];
            result[key].active = false;
            return result;
          }, {}),
          [action.noteId]: {
            ...state.notesList[action.noteId],
            active: true,
          },
        },
      };
    }

    case types.SET_ACTIVE_NOTE_VALUE: {
      return {
        ...state,
        notesList: {
          ...state.notesList,
          [action.activeNoteId]: {
            ...state.notesList[action.activeNoteId],
            value: action.value,
            preview: action.value.toJSON().document.nodes[0].nodes[0].text,
          },
        },
      };
    }

    case types.SET_NOTE_TITLE: {
      return {
        ...state,
        notesList: {
          ...state.notesList,
          [action.activeNoteId]: {
            ...state.notesList[action.activeNoteId],
            title: action.title,
          },
        },
      };
    }

    case types.STORE_NOTES_LIST: {
      return {
        ...state,
        notesList: action.notesList,
      };
    }

    case types.REMOVE_ALL_NOTES: {
      return {
        ...state,
        notesList: {},
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
