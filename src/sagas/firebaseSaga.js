import { takeEvery, select, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getNotesList } from './selectors';
import { isEqual } from 'lodash';
import { updateSyncedStatusAction } from '../actions';
import CryptoJS from 'crypto-js';
import 'regenerator-runtime/runtime';

export function* firebaseSaga() {
  yield takeEvery(types.FIRESTORE_CHANGE_DETECTED, processFirestoreChangedSaga);
}

function* processFirestoreChangedSaga({ doc, user }) {
  let notesList = JSON.parse(JSON.stringify(yield select(getNotesList)));
  let remoteNotesList = doc.data();
  let secret = user.uid;
  remoteNotesList = Object.keys(remoteNotesList).reduce((result, id) => {
    result[id] = remoteNotesList[id];
    result[id].value = JSON.parse(
      CryptoJS.AES.decrypt(remoteNotesList[id].value, secret).toString(
        CryptoJS.enc.Utf8
      )
    );
    return result;
  }, {});
  console.log(notesList, remoteNotesList);
  let equal = isEqual(notesList, remoteNotesList);
  if (equal) {
    yield put(updateSyncedStatusAction({ synced: true }));
  }
}
