import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, take, cancelled, all } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import { Timestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { getUsers } from '@api/users/getUsers'
import { watchConversation } from '@api/conversation/watchConversation'
import { checkConversation } from '@api/conversation/checkConversation'
import { createConversation } from '@api/conversation/createConversation'
import { setConversation } from '@api/conversation/setConversation'
import { removeConversation } from '@api/conversation/removeConversation'
import { removeUserConversation } from '@api/conversation/removeUserConversation'
import {
	watchConversationFail,
	watchConversationSuccess,
	createDirectConversationFail,
	createDirectConversationSuccess,
	removeConversationFail,
	removeConversationSuccess,
	createGroupConversationSuccess,
	createGroupConversationFail,
	addInterlocutorFail,
	addInterlocutorSuccess,
	closeAddInterlocutorModal,
	removeInterlocutorSuccess,
	removeInterlocutorFail, editConversationFail, editConversationSuccess, closeEditConversationModal
} from '@store/reducers/conversationReducer/conversationActions'
import { closeAddConversationModal } from '@store/reducers/conversationsReducer/conversationsActions'
import { actionTypes } from '@constants/actionTypes'
import { routeNames } from '@constants/routeNames'
import { messages } from '@constants/validationMessages'
import { setConversationInterlocutor } from '@api/conversation/setConversationInterlocutor'
import { removeUserFromConversation } from '@api/conversation/removeUserFromConversation'
import { updateConversation } from '@api/conversation/updateConversation'

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

export function* createGroupConversationSaga(props) {
	const userID = props.payload.userID
	const name = props.payload.name
	const avatar = props.payload.avatar
	const description = props.payload.description
	const navigate = props.payload.navigate

	const conversation = {
		id: uuid(),
		name: name,
		description: description,
		avatar: avatar,
		admin: userID,
		directConversation: false,
		conversationalists: [userID],
		conversationStart: Timestamp.fromDate(new Date()),
		lastMessage: null
	}

	try {
		yield call(createConversation, conversation)
		yield call(setConversation, userID, conversation.id)
		yield put(createGroupConversationSuccess())
		yield put(closeAddConversationModal())
		navigate(`${routeNames.CONVERSATIONS}/${conversation.id}`)
	} catch (err) {
		yield put(createGroupConversationFail(err.message))
	}
}

export function* removeConversationSaga(props) {
	const conversationID = props.payload.conversationID
	const conversationalists = props.payload.conversationalists
	const navigate = props.payload.navigate

	try {
		yield call(removeConversation, conversationID)
		yield all(conversationalists.map(interlocutor => call(removeUserConversation, interlocutor.id, conversationID)))
		yield put(removeConversationSuccess())
		navigate(routeNames.CONVERSATIONS)
		yield call(toast.success, messages.conversationRemoveSuccess)
	} catch (err) {
		yield put(removeConversationFail(err.message))
	}
}

export function* editConversationSaga(props) {
	const conversation = props.payload
	delete conversation.conversationalists

	try {
		yield call(updateConversation, conversation)
		yield put(closeEditConversationModal())
		yield put(editConversationSuccess())
	} catch (err) {
		yield put(editConversationFail(err.message))
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

export function* addInterlocutorSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID
	const conversationalists = props.payload.conversationalists

	try {
		yield call(setConversation, userID, conversationID)
		yield call(setConversationInterlocutor, conversationalists, conversationID)
		yield put(closeAddInterlocutorModal())
		yield put(addInterlocutorSuccess())

	} catch (err) {
		yield put(addInterlocutorFail(err.message))
	}
}

export function* removeInterlocutorSaga(props) {
	const userID = props.payload.userID
	const conversationID = props.payload.conversationID

	try {
		yield call(removeUserConversation, userID, conversationID)
		yield call(removeUserFromConversation, userID, conversationID)
		yield put(removeInterlocutorSuccess())

	} catch (err) {
		yield put(removeInterlocutorFail(err.message))
	}
}

export const conversationSaga = [
	takeLatest(actionTypes.CREATE_GROUP_CONVERSATION_START, createGroupConversationSaga),
	takeLatest(actionTypes.CREATE_DIRECT_CONVERSATION_START, createDirectConversationSaga),
	takeLatest(actionTypes.REMOVE_CONVERSATION_START, removeConversationSaga),
	takeLatest(actionTypes.EDIT_CONVERSATION_START, editConversationSaga),
	takeLatest(actionTypes.WATCH_CONVERSATION_START, watchConversationSaga),
	takeLatest(actionTypes.REMOVE_INTERLOCUTOR_START, removeInterlocutorSaga),
	takeLatest(actionTypes.ADD_INTERLOCUTOR_START, addInterlocutorSaga)
]
