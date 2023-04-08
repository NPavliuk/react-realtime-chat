import { call, put, takeLatest } from 'redux-saga/effects'
import { closeAddConversationModal, createDirectConversationFail, createDirectConversationSuccess, getAllConversationsFail, getAllConversationsSuccess } from '@store/reducers/conversationsReducer/conversationsActions'
import { createMessages } from '@api/messages/createMessages'
import { setConversation } from '@api/conversations/setConversation'
import { getConversations } from '@api/conversations/getConversations'
import { checkConversation } from '@api/conversations/checkConversation'
import { createDirectConversation } from '@api/conversations/createDirectConversation'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import toast from 'react-hot-toast'

export function* createDirectConversationSaga(props) {
	const currentUID = props.payload.currentUID
	const interlocutorUID = props.payload.interlocutorUID
	const conversationalists = [currentUID, interlocutorUID]

	try {
		const conversationExist = yield call(checkConversation, currentUID, interlocutorUID)
		if (!conversationExist) {
			const conversationID = yield call(createMessages)
			yield call(createDirectConversation, conversationID, conversationalists)
			yield call(setConversation, currentUID, conversationID)
			const conversations = yield call(getConversations, currentUID)
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

export function* getAllConversationSaga(props) {
	const currentUID = props.payload

	try {
		const conversations = yield call(getConversations, currentUID)
		yield put(getAllConversationsSuccess(conversations))
	} catch (err) {
		yield put(getAllConversationsFail(err.message))
	}
}

export const conversationsSaga = [
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.GET_ALL_CONVERSATIONS_START, getAllConversationSaga)
]
