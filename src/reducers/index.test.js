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
      lastModified: expect.any(Number),
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

  it('should set the active note value', () => {
    let activeNoteId = uuid();
    let initialState = {
      notesList: {
        [activeNoteId]: {
          value: undefined,
          preview: 'to be removed',
          active: true,
        },
      },
    };
    let expectedState = {
      notesList: {
        [activeNoteId]: {
          value: initialValue,
          preview: '',
          active: true,
          lastModified: expect.any(Number),
        },
      },
    };

    expect(
      rootReducer(
        initialState,
        actions.setActiveNoteValueAction({ activeNoteId, value: initialValue })
      )
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
          lastModified: expect.any(Number),
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

  it('should update the notes list', () => {
    let expectedState = {
      notesList: {
        note: 'fake note',
      },
      user: null,
    };

    expect(
      rootReducer(
        initialState,
        actions.updateUserNotesAction({ note: 'fake note' })
      )
    ).toEqual(expectedState);
  });

  it('should update the notes list', () => {
    let initialState = {
      notesList: {
        [uuid()]: {
          title: '',
          preview: '',
          active: false,
          value: initialValue,
        },
        [uuid()]: {
          title: '',
          preview: '',
          active: true,
          value: initialValue,
        },
      },
    };
    let expectedState = {
      notesList: {},
    };

    expect(rootReducer(initialState, actions.removeAllNotesAction())).toEqual(
      expectedState
    );
  });
});
