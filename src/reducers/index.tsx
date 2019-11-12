import * as types from '../actions/types';
import initialValue from '../utils/slate/initialValue';
import uuid from 'uuid/v4';
import { INotesList } from '../interfaces';
import { Value } from 'slate';

interface IState {
  user: firebase.User | null;
  notesList: {
    [key: string]: {
      active: boolean;
      lastModified: number;
      data: {
        title: string;
        preview: string;
        value: Value;
      };
    };
  };
  synced: boolean;
}

export const initialState: IState = {
  user: null,
  notesList: {},
  synced: false,
};

function rootReducer(state = initialState, action: types.ActionTypes): IState {
  switch (action.type) {
    case types.UPDATE_USER: {
      return { ...state, user: action.user };
    }

    case types.ADD_NEW_NOTE: {
      return {
        ...state,
        notesList: {
          ...Object.keys(state.notesList).reduce(
            (result: INotesList, key: string) => {
              result[key] = state.notesList[key];
              result[key].active = false;
              return result;
            },
            {}
          ),
          [uuid()]: {
            data: {
              title: '',
              preview: '',
              value: initialValue,
            },
            active: true,
            lastModified: new Date().getTime(),
          },
        },
      };
    }

    case types.SET_NOTE_ACTIVE: {
      return {
        ...state,
        notesList: {
          ...Object.keys(state.notesList).reduce(
            (result: INotesList, key: string) => {
              result[key] = state.notesList[key];
              result[key].active = false;
              return result;
            },
            {}
          ),
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
            data: {
              ...state.notesList[action.activeNoteId].data,
              value: action.value,
              preview: action.preview,
            },
            lastModified: action.updateLastModified
              ? new Date().getTime()
              : state.notesList[action.activeNoteId].lastModified,
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
            data: {
              ...state.notesList[action.activeNoteId].data,
              title: action.title,
            },
            lastModified: new Date().getTime(),
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

    case types.UPDATE_SYNCED_STATUS: {
      return {
        ...state,
        synced: action.synced,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
