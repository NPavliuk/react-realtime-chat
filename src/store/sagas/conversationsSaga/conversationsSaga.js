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
		}
	} catch (error) {
		yield put(watchConversationsFail(error))
	} finally {
		if (yield cancelled()) {
			userConversationsChannel.close()
		}
	}
}

export const conversationsSaga = [
	takeLatest(actionTypes.WATCH_CONVERSATIONS_START, watchConversationsSaga)
]
