import { all } from 'redux-saga/effects';
import { firebaseSaga } from './firebaseSaga';
import { notesListSaga } from './notesListSaga';

export default function* rootSaga() {
  yield all([firebaseSaga(), notesListSaga()]);
}
