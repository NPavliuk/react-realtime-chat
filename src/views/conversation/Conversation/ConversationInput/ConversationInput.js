import styles from './ConversationInput.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	setConversationInput,
	setConversationMessageStart
} from '@store/reducers/conversationReducer/conversationActions'
import { getConversationalistsIDs } from '@helpers/conversations'
import { MessageSendButton } from '@components/ui/buttons'
import { MessageEditor } from '@components/ui/editors'
import { useRef } from 'react'

export const ConversationInput = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversationID = useSelector(state => state.conversation.id)
	const conversations = useSelector(state => state.conversations.conversations)
	const message = useSelector(state => state.conversation.messageInput)
	const buttonRef = useRef()

	const sendMessageHandler = (e) => {
		e.preventDefault()

		const data = {
			userID: userID,
			conversationID: conversationID,
			conversationalists:  getConversationalistsIDs(conversations, conversationID),
			messageText: message
		}

		dispatch(setConversationMessageStart(data))
		dispatch(setConversationInput(''))
	}

	return (
		<form className={styles.wrapper} onSubmit={sendMessageHandler}>
			<MessageEditor buttonRef={buttonRef} />
			<div className={styles.controls}>
				<MessageSendButton buttonRef={buttonRef} />
			</div>
		</form>
	)
}
