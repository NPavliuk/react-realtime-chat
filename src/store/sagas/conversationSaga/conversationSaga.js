import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, take, cancelled } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { Timestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { getUsers } from '@api/users/getUsers'
import { watchConversation } from '@api/conversation/watchConversation'
import { checkConversation } from '@api/conversation/checkConversation'
import { createConversation } from '@api/conversation/createConversation'
import { setConversation } from '@api/conversation/setConversation'
import { removeConversation } from '@api/conversation/removeConversation'
import { watchConversationFail, watchConversationSuccess } from '@store/reducers/conversationReducer/conversationActions'
import { closeAddConversationModal, createDirectConversationFail, createDirectConversationSuccess, removeConversationsFail, removeConversationsSuccess } from '@store/reducers/conversationsReducer/conversationsActions'
import { actionTypes } from '@constants/actionTypes'
import { routeNames } from '@constants/routeNames'
import { messages } from '@constants/validationMessages'

export function* createDirectConversationSaga(props) {
	const userID = props.payload.userID
	const interlocutorID = props.payload.interlocutorID
	const navigate = props.payload.navigate

	const conversation = {
		id: uuid(),
		directConversation: true,
		conversationalists: [userID, interlocutorID],
		conversationStart: Timestamp.fromDate(new Date()),
		lastMessage: null
	}

	try {
		const conversationExist = yield call(checkConversation, userID, interlocutorID)
		if (!conversationExist) {
			yield call(createConversation, conversation)
			yield call(setConversation, userID, conversation.id)
			yield put(createDirectConversationSuccess())
			yield put(closeAddConversationModal())
			navigate(`${routeNames.CONVERSATIONS}/${conversation.id}`)
		} else {
			yield put(createDirectConversationFail(messages.conversationAlreadyExist))
			yield call(toast.error, messages.conversationAlreadyExist)
		}
	} catch (err) {
		yield put(createDirectConversationFail(err.message))
	}
}

export function* removeConversationSaga(props) {
	const userID = props.payload.userID
	const interlocutorID = props.payload.interlocutorID
	const conversationID = props.payload.conversationID
	const navigate = props.payload.navigate

	try {
		yield call(removeConversation, userID, interlocutorID, conversationID)
		yield put(removeConversationsSuccess())
		navigate(routeNames.CONVERSATIONS)
		yield call(toast.success, messages.conversationRemoveSuccess)
	} catch (err) {
		yield put(removeConversationsFail(err.message))
	}
}

function* watchConversationSaga(props) {
	const conversationID = props.payload
	const channel = yield call(watchConversation, eventChannel, conversationID)

	try {
		while (true) {
			const conversation = yield take(channel)
			if (conversation) {
				conversation.conversationalists = yield call(getUsers, conversation.conversationalists)
			}
			yield put(watchConversationSuccess(conversation))
		}
	} catch (error) {
		yield put(watchConversationFail(error))
	} finally {
		if (yield cancelled()) {
			channel.close()
		}
	}
}

export const conversationSaga = [
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga),
	takeLatest(actionTypes.WATCH_CONVERSATION_START, watchConversationSaga),
]
