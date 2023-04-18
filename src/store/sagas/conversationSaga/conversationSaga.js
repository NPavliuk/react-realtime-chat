import { call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '@constants/actionTypes'
import { v4 as uuid } from 'uuid'
import { Timestamp } from 'firebase/firestore'
import { setConversationMessageFail,removeConversationMessageFail } from '@store/reducers/conversationReducer/conversationActions'
import { setMessage } from '@api/messages/setMessage'
import { removeMessage } from '@api/messages/removeMessage'

export function* setConversationMessageSaga(props) {
	const conversationID = props.payload.conversationID
	const message = {
		id: uuid(),
		senderId: props.payload.userID,
		text: props.payload.messageText ? props.payload.messageText : '',
		attachments: props.payload.attachments ? props.payload.attachments : {},
		date: Timestamp.now()
	}

	try {
		yield call(setMessage, message, conversationID)
	} catch (error) {
		yield put(setConversationMessageFail(error))
	}
}

export function* removeConversationMessageSaga(props) {
	const message = props.payload.message
	const conversationID = props.payload.conversationID

	try {
		yield call(removeMessage, message, conversationID)
	} catch (error) {
		yield put(removeConversationMessageFail(error))
	}
}

export const conversationSaga = [
	takeLatest(actionTypes.SET_CONVERSATION_MESSAGE_START, setConversationMessageSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_MESSAGE_START, removeConversationMessageSaga)
]
