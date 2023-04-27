import { call, put, takeLatest, take, cancelled, all } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { Timestamp } from 'firebase/firestore'
import { setConversation } from '@api/conversations/setConversation'
import { checkConversation } from '@api/conversations/checkConversation'
import { createConversation } from '@api/conversations/createConversation'
import { removeConversation } from '@api/conversations/removeConversation'
import {
	closeAddConversationModal, createDirectConversationFail, createDirectConversationSuccess,
	removeConversationsFail, removeConversationsSuccess, watchConversationsFail, watchConversationsSuccess
} from '@store/reducers/conversationsReducer/conversationsActions'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import { eventChannel } from 'redux-saga'
import {
	watchConversationFail,
	watchConversationSuccess
} from '@store/reducers/conversationReducer/conversationActions'
import { watchConversation } from '@api/conversations/watchConversation'
import { getUsers } from '@api/users/getUsers'
import { watchConversations } from '@api/conversations/watchConversations'

export function* createDirectConversationSaga(props) {
	const userID = props.payload.userID
	const interlocutorID = props.payload.interlocutorID

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

	try {
		yield call(removeConversation, userID, interlocutorID, conversationID)
		yield put(removeConversationsSuccess())
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

function* watchConversationsSaga(props) {
	const userID = props.payload
	let conversations
	const userConversationsChannel = yield call(watchConversations, eventChannel, userID)

	try {
		while (true) {
			conversations = yield take(userConversationsChannel)
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
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga),
	takeLatest(actionTypes.WATCH_CONVERSATION_START, watchConversationSaga),
	takeLatest(actionTypes.WATCH_CONVERSATIONS_START, watchConversationsSaga)
]
