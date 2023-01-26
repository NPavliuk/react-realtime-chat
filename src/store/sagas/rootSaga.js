import { all } from 'redux-saga/effects'
import { userSaga } from '@store/sagas/userSaga/userSaga'

export function* rootSaga() {
  yield all([...userSaga])
}
