import rootReducer, { initialState } from '.';
import * as actions from '../actions';
import initialValue from '../utils/slate/initialValue';
import uuid from 'uuid/v4';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it('should update user', () => {
    expect(
      rootReducer(initialState, actions.updateUserAction({ name: 'henry' }))
    ).toEqual({ ...initialState, user: { name: 'henry' } });

    expect(
      rootReducer(initialState, actions.updateUserAction(undefined))
    ).toEqual({ ...initialState, user: undefined });
  });

  it('should add a new note', () => {
    let newState = rootReducer(initialState, actions.addNewNoteAction());

    expect(Object.keys(newState.notesList).length).toEqual(1);
    let activeKey = Object.keys(newState.notesList).find(
      key => newState.notesList[key].active
    );
    expect(newState.notesList[activeKey]).toEqual({
      title: '',
      preview: '',
      value: initialValue,
      active: true,
    });
  });

  it('should set a note active', () => {
    let initialState = {
      notesList: {
        first: {
          active: true,
        },
        second: {
          active: false,
        },
      },
    };
    let expectedState = {
      notesList: {
        first: {
          active: false,
        },
        second: {
          active: true,
        },
      },
    };
    expect(
      rootReducer(initialState, actions.setNoteActiveAction('second'))
    ).toEqual(expectedState);
  });

  it('should change the title of a note', () => {
    let activeNoteId = uuid();
    let initialState = {
      notesList: {
        [activeNoteId]: {
          title: 'Before',
        },
      },
    };

    let expectedState = {
      notesList: {
        [activeNoteId]: {
          title: 'After',
        },
      },
    };

    expect(
      rootReducer(
        initialState,
        actions.setNoteTitleAction({ activeNoteId, title: 'After' })
      )
    ).toEqual(expectedState);
  });
});
