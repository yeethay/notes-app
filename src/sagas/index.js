import { all } from 'redux-saga/effects';
import { firebaseSaga } from './firebaseSaga';

export default function* rootSaga() {
  yield all([firebaseSaga()]);
}
