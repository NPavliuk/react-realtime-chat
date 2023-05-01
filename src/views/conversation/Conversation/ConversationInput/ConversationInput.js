import styles from './ConversationInput.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	closeEditConversationMessageMode,
	editConversationMessageStart,
	setConversationInput,
	setConversationMessageStart
} from '@store/reducers/conversationReducer/conversationActions'
import { getConversationalistsIDs } from '@helpers/conversations'
import { CloseButton, MessageSendButton } from '@components/ui/buttons'
import { MessageEditor } from '@components/ui/editors'
import { RiPencilLine, RiCloseFill } from 'react-icons/ri'
import { useRef } from 'react'

export const ConversationInput = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversation = useSelector(state => state.conversation)
	const conversations = useSelector(state => state.conversations.conversations)
	const buttonRef = useRef()

	const sendMessageHandler = (e) => {
		e.preventDefault()

		const data = {
			userID: userID,
			conversationID: conversation.id,
			conversationalists: getConversationalistsIDs(conversations, conversation.id),
			messageText: conversation.messageInput
		}

		dispatch(setConversationMessageStart(data))
		dispatch(setConversationInput(''))
	}

	const sendEditMessageHandler = (e) => {
		e.preventDefault()
		conversation.editMessage.message.text = conversation.messageInput

		const data = {
			conversationID: conversation.id,
			message: conversation.editMessage.message,
			lastMessage: conversation.data.lastMessage
		}

		dispatch(editConversationMessageStart(data))
	}

	const cancelEditHandler = () => {
		dispatch(closeEditConversationMessageMode())
	}

	return (
		conversation.editMessage.mode ?
			<form className={styles.wrapper} onSubmit={sendEditMessageHandler}>
				<div className={styles.editMode}>
					<div className={styles.header}>
						<RiPencilLine/>
						<p className={styles.title}>Edit message</p>
						<CloseButton handler={cancelEditHandler}/>
					</div>
					<div dangerouslySetInnerHTML={{__html: conversation.editMessage.message.text}}></div>
				</div>
				<MessageEditor buttonRef={buttonRef} value={conversation.messageInput}/>
				<div className={styles.controls}>
					<MessageSendButton buttonRef={buttonRef}/>
				</div>
			</form>
			:
			<form className={styles.wrapper} onSubmit={sendMessageHandler}>
				<MessageEditor buttonRef={buttonRef} value={conversation.messageInput}/>
				<div className={styles.controls}>
					<MessageSendButton buttonRef={buttonRef}/>
				</div>
			</form>
	)
}
