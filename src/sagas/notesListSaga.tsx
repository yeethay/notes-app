import { takeEvery, select, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getNotesList } from './selectors';
import { setNoteActiveAction } from '../actions';

export function* notesListSaga() {
  yield takeEvery(types.DELETE_NOTE, updateActiveNoteSaga);
}

function* updateActiveNoteSaga({
  noteId,
  lastModified,
  active,
}: {
  type: typeof types.DELETE_NOTE;
  noteId: string;
  lastModified: number;
  active: boolean;
}) {
  let notesList = yield select(getNotesList);
  console.log(notesList);
  if (active && Object.keys(notesList).length > 0) {
    let keys = Object.keys(notesList);
    let sortedKeys = keys.sort((a, b) =>
      notesList[a].lastModified < notesList[b].lastModified ? 1 : -1
    );
    let nextActiveId;
    for (let key of sortedKeys) {
      if (notesList[key].lastModified > lastModified) {
        continue;
      } else {
        nextActiveId = key;
        break;
      }
    }
    if (!nextActiveId) {
      nextActiveId = sortedKeys[sortedKeys.length - 1];
    }
    yield put(setNoteActiveAction(nextActiveId));
  }
}
