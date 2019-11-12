import rootReducer, { initialState } from '.';
import * as actions from '../actions';
import initialValue from '../utils/slate/initialValue';
import uuid from 'uuid/v4';

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should update user', () => {
    expect(
      rootReducer(
        initialState,
        actions.updateUserAction({ name: 'henry' } as any)
      )
    ).toEqual({
      ...initialState,
      user: { name: 'henry' },
    });

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
      data: {
        title: '',
        preview: '',
        value: initialValue,
      },
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
      rootReducer(initialState as any, actions.setNoteActiveAction('second'))
    ).toEqual(expectedState);
  });

  it('should set the active note value', () => {
    let activeNoteId = uuid();
    let initialState: any = {
      notesList: {
        [activeNoteId]: {
          data: {
            value: undefined,
            preview: 'to be removed',
          },
          active: true,
        },
      },
    };
    let expectedState = {
      notesList: {
        [activeNoteId]: {
          data: {
            value: initialValue,
            preview: '',
          },
          active: true,
          lastModified: expect.any(Number),
        },
      },
    };

    expect(
      rootReducer(
        initialState,
        actions.setActiveNoteValueAction(activeNoteId, initialValue, true, '')
      )
    ).toEqual(expectedState);
  });

  it('should change the title of a note', () => {
    let activeNoteId = uuid();
    let initialState = {
      notesList: {
        [activeNoteId]: {
          data: {
            title: 'Before',
          },
        },
      },
    };

    let expectedState = {
      notesList: {
        [activeNoteId]: {
          data: {
            title: 'After',
          },
          lastModified: expect.any(Number),
        },
      },
    };

    expect(
      rootReducer(
        initialState as any,
        actions.setNoteTitleAction(activeNoteId, 'After')
      )
    ).toEqual(expectedState);
  });

  it('should update the notes list', () => {
    let expectedState = {
      notesList: {
        note: 'fake note',
      },
      user: null,
      synced: false,
    };

    expect(
      rootReducer(
        initialState,
        actions.updateUserNotesAction({ note: 'fake note' } as any)
      )
    ).toEqual(expectedState);
  });

  it('should update the notes list', () => {
    let initialState = {
      notesList: {
        [uuid()]: {
          data: {
            title: '',
            preview: '',
            value: initialValue,
          },
          active: false,
        },
        [uuid()]: {
          data: {
            title: '',
            preview: '',
            value: initialValue,
          },
          active: true,
        },
      },
    };
    let expectedState = {
      notesList: {},
    };

    expect(
      rootReducer(initialState as any, actions.removeAllNotesAction())
    ).toEqual(expectedState);
  });
});
