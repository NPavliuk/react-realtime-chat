import toast from 'react-hot-toast'
import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, take, cancelled } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { Timestamp } from 'firebase/firestore'
import { setMessage } from '@api/messages/setMessage'
import { removeMessage } from '@api/messages/removeMessage'
import { setLastMessage } from '@api/messages/setLastMessage'
import { setConversationalists } from '@api/conversation/setConversationalists'
import { getLastMessage } from '@api/messages/getLastMessage'
import { watchMessages } from '@api/messages/watchMessages'
import { updateMessage } from '@api/messages/updateMessage'
import { removeMessages } from '@api/messages/removeMessages'
import {
	setMessageFail,
	removeMessageFail,
	removeMessageSuccess,
	setReadedMessageStart,
	setReadedMessageSuccess,
	watchMessagesSuccess,
	watchMessagesFail,
	editMessageFail,
	editMessageSuccess,
	likeMessageSuccess,
	likeMessageFail,
	unlikeMessageSuccess,
	unlikeMessageFail, clearMessagesSuccess, clearMessagesFail
} from '@store/reducers/messagesReducer/messagesActions'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'

export function* setMessageSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID
	const conversationalists = props.payload.conversationalists

	const message = {
		id: uuid(),
		senderId: userID,
		text: props.payload.messageText ? props.payload.messageText : '',
		attachments: props.payload.attachments ? props.payload.attachments : {},
		date: Timestamp.now(),
		readers: [userID],
		likes: [],
		edited: false,
		replyMessage: props.payload.replyMessage ? props.payload.replyMessage : null
	}

	try {
		yield call(setMessage, message, conversationID)
		yield call(setLastMessage, message, conversationID)
		yield call(setConversationalists, userID, conversationalists, conversationID)
	} catch (error) {
		yield put(setMessageFail(error))
	}
}

export function* editMessageSaga(props) {
	const conversationID = props.payload.conversationID
	const lastMessage = props.payload.lastMessage
	const message = props.payload.message

	message.edited = true

	try {
		yield call(updateMessage, message, conversationID)
		if (lastMessage.id === message.id) {
			yield call(setLastMessage, message, conversationID)
		}
		yield put(editMessageSuccess())
	} catch (error) {
		yield put(editMessageFail(error))
	}
}

export function* likeMessageSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID
	const message = props.payload.message

	message.likes.push(userID)

	try {
		yield call(updateMessage, message, conversationID)
		yield put(likeMessageSuccess())
	} catch (error) {
		yield put(likeMessageFail(error))
	}
}

export function* unlikeMessageSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID
	const message = props.payload.message

	message.likes = props.payload.message.likes.filter(id => id !== userID)

	try {
		yield call(updateMessage, message, conversationID)
		yield put(unlikeMessageSuccess())
	} catch (error) {
		yield put(unlikeMessageFail(error))
	}
}

export function* removeMessageSaga(props) {
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
		yield put(removeMessageSuccess())
	} catch (error) {
		yield put(removeMessageFail(error))
	}
}

export function* setReadedMessageSaga(props) {
	const userID = props.payload.userID
	const message = props.payload.message
	const conversationID = props.payload.conversationID

	message.readers.push(userID)

	try {
		yield call(setMessage, message, conversationID)
		const lastMessage = yield call(getLastMessage, conversationID)
		if (message.id === lastMessage.id) {
			lastMessage.readers.push(userID)
			yield call(setLastMessage, lastMessage, conversationID)
		}
		yield put(setReadedMessageSuccess())
	} catch (error) {
		yield put(setReadedMessageStart(error))
	}
}

function* watchMessagesSaga(props) {
	const conversationID = props.payload
	const channel = yield call(watchMessages, eventChannel, conversationID)

	try {
		while (true) {
			const messages = yield take(channel)
			yield put(watchMessagesSuccess(messages))
		}
	} catch (error) {
		yield put(watchMessagesFail(error))
	} finally {
		if (yield cancelled()) {
			channel.close()
		}
	}
}

export function* clearMessagesSaga(props) {
	const conversationID = props.payload

	try {
		yield call(removeMessages, conversationID)
		yield call(setLastMessage, null, conversationID)
		yield put(clearMessagesSuccess())
		yield call(toast.success, messages.conversationMessagesRemoveSuccess)
	} catch (err) {
		yield put(clearMessagesFail(err.message))
	}
}

export const messagesSaga = [
	takeLatest(actionTypes.SET_MESSAGE_START, setMessageSaga),
	takeLatest(actionTypes.EDIT_MESSAGE_START, editMessageSaga),
	takeLatest(actionTypes.LIKE_MESSAGE_START, likeMessageSaga),
	takeLatest(actionTypes.UNLIKE_MESSAGE_START, unlikeMessageSaga),
	takeLatest(actionTypes.REMOVE_MESSAGE_START, removeMessageSaga),
	takeLatest(actionTypes.SET_READED_MESSAGE_START, setReadedMessageSaga),
	takeLatest(actionTypes.WATCH_MESSAGES_START, watchMessagesSaga),
	takeLatest(actionTypes.CLEAR_MESSAGES_START, clearMessagesSaga),
]
