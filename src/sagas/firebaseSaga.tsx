import { takeEvery, select, put } from 'redux-saga/effects';
import * as types from '../actions/types';
import { getNotesList } from './selectors';
import { isEqual } from 'lodash';
import { updateSyncedStatusAction } from '../actions';
import CryptoJS from 'crypto-js';
import 'regenerator-runtime/runtime';
import { INotesList } from '../interfaces';

export function* firebaseSaga() {
  yield takeEvery(types.FIRESTORE_CHANGE_DETECTED, processFirestoreChangedSaga);
  yield takeEvery(types.STORE_NOTES_LIST, updateDocumentTitleSaga);
}

function* processFirestoreChangedSaga({
  doc,
  user,
}: {
  type: typeof types.FIRESTORE_CHANGE_DETECTED;
  doc: firebase.firestore.DocumentSnapshot;
  user: firebase.User;
}) {
  let notesList = JSON.parse(JSON.stringify(yield select(getNotesList)));
  let remoteNotesList: INotesList | undefined = doc.data();
  let secret = user.uid;
  remoteNotesList = Object.keys(remoteNotesList as INotesList).reduce(
    (result: INotesList, id: string) => {
      result[id] = (remoteNotesList as INotesList)[id];
      result[id].data = JSON.parse(
        CryptoJS.AES.decrypt(
          (remoteNotesList as INotesList)[id].data as any,
          secret
        ).toString(CryptoJS.enc.Utf8)
      );
      return result;
    },
    {}
  );
  let equal = isEqual(notesList, remoteNotesList);
  if (equal) {
    yield put(updateSyncedStatusAction(true));
  }
}

function* updateDocumentTitleSaga({
  notesList,
}: {
  type: typeof types.STORE_NOTES_LIST;
  notesList: INotesList;
}) {
  let activeId = Object.keys(notesList).find(id => notesList[id].active);
  yield (document.title = 'Notes App | ' + notesList[activeId!].data.title);
}
