import { all } from 'redux-saga/effects'
import { userSaga } from '@store/sagas/userSaga/userSaga'
import { authSaga } from '@store/sagas/authSaga/authSaga'

export function* rootSaga() {
  yield all([...userSaga])
  yield all([...authSaga])
}
