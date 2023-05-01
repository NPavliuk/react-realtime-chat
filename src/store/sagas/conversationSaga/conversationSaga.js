import { call, put, takeLatest, take, cancelled } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import { v4 as uuid } from 'uuid'
import { Timestamp } from 'firebase/firestore'
import {
	setConversationMessageFail,
	removeConversationMessageFail,
	removeConversationMessageSuccess,
	setReadedConversationMessageStart,
	setReadedConversationMessageSuccess,
	watchConversationMessagesSuccess,
	watchConversationMessagesFail, editConversationMessageFail, editConversationMessageSuccess
} from '@store/reducers/conversationReducer/conversationActions'
import { setMessage } from '@api/messages/setMessage'
import { removeMessage } from '@api/messages/removeMessage'
import { setLastMessage } from '@api/messages/setLastMessage'
import { setConversationalists } from '@api/conversations/setConversationalists'
import { getLastMessage } from '@api/messages/getLastMessage'
import { watchMessages } from '@api/messages/watchMessages'
import { eventChannel } from 'redux-saga'
import { updateMessage } from '@api/messages/updateMessage'

export function* setConversationMessageSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID
	const conversationalists = props.payload.conversationalists

	const message = {
		id: uuid(),
		senderId: userID,
		text: props.payload.messageText ? props.payload.messageText : '',
		attachments: props.payload.attachments ? props.payload.attachments : {},
		date: Timestamp.now(),
		readers: [userID]
	}

	try {
		yield call(setMessage, message, conversationID)
		yield call(setLastMessage, message, conversationID)
		yield call(setConversationalists, userID, conversationalists, conversationID)
	} catch (error) {
		yield put(setConversationMessageFail(error))
	}
}

export function* editConversationMessageSaga(props) {
	const conversationID = props.payload.conversationID
	const lastMessage = props.payload.lastMessage
	const message = {
		...props.payload.message,
		edited: true
	}

	try {
		yield call(updateMessage, message, conversationID)
		if (lastMessage.id === message.id) {
			yield call(setLastMessage, message, conversationID)
		}
		yield put(editConversationMessageSuccess())
	} catch (error) {
		yield put(editConversationMessageFail(error))
	}
}

export function* removeConversationMessageSaga(props) {
	const message = props.payload.message
	const lastMessage = props.payload.lastMessage
	const conversationID = props.payload.conversationID

	try {
		yield call(removeMessage, message, conversationID)
		if (lastMessage) {
			yield call(setLastMessage, lastMessage, conversationID)
		} else if (lastMessage === undefined) {
			yield call(setLastMessage, null, conversationID)
		}
		yield put(removeConversationMessageSuccess())
	} catch (error) {
		yield put(removeConversationMessageFail(error))
	}
}

export function* setReadedConversationMessageSaga(props) {
	const userID = props.payload.userID
	const message = props.payload.message
	const conversationID = props.payload.conversationID

	try {
		message.readers.push(userID)
		yield call(setMessage, message, conversationID)
		const lastMessage = yield call(getLastMessage, conversationID)
		if (message.id === lastMessage.id) {
			lastMessage.readers.push(userID)
			yield call(setLastMessage, lastMessage, conversationID)
		}
		yield put(setReadedConversationMessageSuccess())
	} catch (error) {
		yield put(setReadedConversationMessageStart(error))
	}
}

function* watchMessagesSaga(props) {
	const conversationID = props.payload
	const channel = yield call(watchMessages, eventChannel, conversationID)

	try {
		while (true) {
			const messages = yield take(channel)
			yield put(watchConversationMessagesSuccess(messages))
		}
	} catch (error) {
		yield put(watchConversationMessagesFail(error))
	} finally {
		if (yield cancelled()) {
			channel.close()
		}
	}
}

export const conversationSaga = [
	takeLatest(actionTypes.SET_CONVERSATION_MESSAGE_START, setConversationMessageSaga),
	takeLatest(actionTypes.EDIT_CONVERSATION_MESSAGE_START, editConversationMessageSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_MESSAGE_START, removeConversationMessageSaga),
	takeLatest(actionTypes.SET_READED_CONVERSATION_MESSAGE_START, setReadedConversationMessageSaga),
	takeLatest(actionTypes.WATCH_CONVERSATION_MESSAGES_START, watchMessagesSaga)
]
