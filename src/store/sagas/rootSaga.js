import { all } from 'redux-saga/effects'
import { userSaga } from '@store/sagas/userSaga/userSaga'
import { authSaga } from '@store/sagas/authSaga/authSaga'
import { usersSaga } from '@store/sagas/usersSaga/usersSaga'
import { contactsSaga } from '@store/sagas/contactsSaga/contactsSaga'

export function* rootSaga() {
  yield all([...authSaga])
  yield all([...userSaga])
  yield all([...usersSaga])
  yield all([...contactsSaga])
}
