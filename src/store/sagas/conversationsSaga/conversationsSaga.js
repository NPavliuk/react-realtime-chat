import { call, put, takeLatest } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import toast from 'react-hot-toast'
import { Timestamp } from 'firebase/firestore'
import { setConversation } from '@api/conversations/setConversation'
import { checkConversation } from '@api/conversations/checkConversation'
import { createConversation } from '@api/conversations/createConversation'
import { removeConversation } from '@api/conversations/removeConversation'
import {
	closeAddConversationModal, createDirectConversationFail, createDirectConversationSuccess,
	removeConversationsFail, removeConversationsSuccess
} from '@store/reducers/conversationsReducer/conversationsActions'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'

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

export function* createGroupConversationSaga(props) {

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

export const conversationsSaga = [
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga),
]
