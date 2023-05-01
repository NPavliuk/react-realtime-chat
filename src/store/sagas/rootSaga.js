import { all } from 'redux-saga/effects'
import { userSaga } from '@store/sagas/userSaga/userSaga'
import { authSaga } from '@store/sagas/authSaga/authSaga'
import { usersSaga } from '@store/sagas/usersSaga/usersSaga'
import { profileSaga } from '@store/sagas/profileSaga/profileSaga'
import { conversationSaga } from '@store/sagas/conversationSaga/conversationSaga'
import { conversationsSaga } from '@store/sagas/conversationsSaga/conversationsSaga'
import { messagesSaga } from '@store/sagas/MessagesSaga/MessagesSaga'

export function* rootSaga() {
	yield all([...authSaga])
	yield all([...userSaga])
	yield all([...usersSaga])
	yield all([...profileSaga])
	yield all([...conversationsSaga])
	yield all([...conversationSaga])
	yield all([...messagesSaga])
}
