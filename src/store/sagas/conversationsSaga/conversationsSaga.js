import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, take, cancelled } from 'redux-saga/effects'
import { watchConversations } from '@api/conversations/watchConversations'
import { watchConversationsFail, watchConversationsSuccess } from '@store/reducers/conversationsReducer/conversationsActions'
import { actionTypes } from '@constants/actionTypes'

function* watchConversationsSaga(props) {
	const userID = props.payload
	const userConversationsChannel = yield call(watchConversations, eventChannel, userID)

	try {
		while (true) {
			const conversations = yield take(userConversationsChannel)
			yield put(watchConversationsSuccess(conversations))
			console.log(1)
		}
	} catch (error) {
		yield put(watchConversationsFail(error))
	} finally {
		console.log(2)
		if (yield cancelled()) {
			console.log(3)
			userConversationsChannel.close()
		}
	}
}

export const conversationsSaga = [
	takeLatest([actionTypes.WATCH_CONVERSATIONS_START, actionTypes.WATCH_CONVERSATIONS_RESTART], watchConversationsSaga),
]
