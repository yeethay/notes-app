import { takeEvery, select, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getNotesList } from './selectors';
import _ from 'lodash';
import { updateSyncedStatusAction } from '../actions';
import 'regenerator-runtime/runtime';

export function* firebaseSaga() {
  yield takeEvery(types.FIRESTORE_CHANGE_DETECTED, processFirestoreChangedSaga);
}

function* processFirestoreChangedSaga({ doc }) {
  let notesList = JSON.parse(JSON.stringify(yield select(getNotesList)));
  let remoteNotesList = doc.data();
  let equal = _.isEqual(notesList, remoteNotesList);
  if (equal) {
    yield put(updateSyncedStatusAction({ synced: true }));
  }
}
