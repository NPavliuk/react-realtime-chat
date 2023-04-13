import { call, put, takeLatest } from 'redux-saga/effects'
import {
	closeAddConversationModal,
	createDirectConversationFail,
	createDirectConversationSuccess,
	getAllConversationsFail,
	getAllConversationsSuccess,
	removeConversationsFail, removeConversationsSuccess
} from '@store/reducers/conversationsReducer/conversationsActions'
import { createMessages } from '@api/messages/createMessages'
import { setConversation } from '@api/conversations/setConversation'
import { getConversations } from '@api/conversations/getConversations'
import { checkConversation } from '@api/conversations/checkConversation'
import { createConversation } from '@api/conversations/createConversation'
// import { listenConversations } from '@api/conversations/listenConversations'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import toast from 'react-hot-toast'
import { removeConversation } from '@api/conversations/removeConversation'


export function* createDirectConversationSaga(props) {
	const currentUID = props.payload.currentUID
	const interlocutorUID = props.payload.interlocutorUID
	const conversationalists = [currentUID, interlocutorUID]

	try {
		const conversationExist = yield call(checkConversation, currentUID, interlocutorUID)
		if (!conversationExist) {
			const conversationID = yield call(createMessages)
			yield call(createConversation, conversationID, conversationalists)
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

export function* removeConversationSaga(props) {
	const currentUID = props.payload.userId
	const interlocutorUID = props.payload.interlocutorId
	const conversationID = props.payload.conversationId

	try {
		yield call(removeConversation, currentUID, interlocutorUID, conversationID)
		yield put(removeConversationsSuccess)
	} catch (err) {
		yield put(removeConversationsFail(err.message))
	}
}

// export function* listenConversationSaga(props) {
// 	const currentUID = props.payload
//
// 	try {
// 		const conversations = yield call(listenConversations, currentUID)
// 		yield put(getAllConversationsSuccess(conversations))
// 	} catch (err) {
// 		yield put(getAllConversationsFail(err.message))
// 	}
// }

export const conversationsSaga = [
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga)
	// takeLatest(actionTypes.GET_ALL_CONVERSATIONS_START, listenConversationSaga)
]
