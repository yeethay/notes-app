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
      let newNotesList = { ...state.notesList };

      Object.keys(newNotesList).map(key => (newNotesList[key].active = false));

      newNotesList[uuid()] = {
        title: '',
        preview: '',
        value: initialValue,
        active: true,
      };

      return {
        ...state,
        notesList: newNotesList,
      };
    }

    case types.SET_NOTE_ACTIVE: {
      let newNotesList = { ...state.notesList };

      Object.keys(newNotesList).map(key => (newNotesList[key].active = false));
      let activeKey = Object.keys(newNotesList).find(
        key => key === action.noteId
      );
      newNotesList[activeKey].active = true;

      return {
        ...state,
        notesList: newNotesList,
      };
    }

    case types.SET_ACTIVE_NOTE_VALUE: {
      let newNotesList = { ...state.notesList };

      let activeKey = Object.keys(newNotesList).find(
        key => newNotesList[key].active
      );
      newNotesList[activeKey].value = action.value;
      let text = action.value.toJSON().document.nodes[0].nodes[0].text;
      newNotesList[activeKey].preview = text;

      return { ...state, notesList: newNotesList };
    }

    case types.SET_NOTE_TITLE: {
      let newNotesList = { ...state.notesList };

      let activeKey = Object.keys(newNotesList).find(
        key => newNotesList[key].active
      );
      newNotesList[activeKey].title = action.title;

      return { ...state, notesList: newNotesList };
    }

    case types.STORE_NOTES_LIST: {
      return { ...state, notesList: action.notesList };
    }

    case types.REMOVE_ALL_NOTES: {
      return { ...state, notesList: {} };
    }

    default:
      return state;
  }
}

export default rootReducer;
