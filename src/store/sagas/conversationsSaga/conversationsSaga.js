import { call, put, takeLatest } from 'redux-saga/effects'
import {
	closeAddConversationModal,
	createDirectConversationFail,
	createDirectConversationSuccess,
	removeConversationsFail, removeConversationsSuccess
} from '@store/reducers/conversationsReducer/conversationsActions'
import { createMessages } from '@api/messages/createMessages'
import { setConversation } from '@api/conversations/setConversation'
import { getConversations } from '@api/conversations/getConversations'
import { checkConversation } from '@api/conversations/checkConversation'
import { createConversation } from '@api/conversations/createConversation'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import toast from 'react-hot-toast'
import { removeConversation } from '@api/conversations/removeConversation'


export function* createDirectConversationSaga(props) {
	const userID = props.payload.userID
	const interlocutorID = props.payload.interlocutorID
	const conversationalists = [userID, interlocutorID]

	try {
		const conversationExist = yield call(checkConversation, userID, interlocutorID)
		if (!conversationExist) {
			const conversationID = yield call(createMessages)
			yield call(createConversation, conversationID, conversationalists)
				yield call(setConversation, userID, conversationID)
			const conversations = yield call(getConversations, userID)
			yield put(createDirectConversationSuccess(conversations))
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
		yield put(removeConversationsSuccess)
	} catch (err) {
		yield put(removeConversationsFail(err.message))
	}
}

export const conversationsSaga = [
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga),
]
