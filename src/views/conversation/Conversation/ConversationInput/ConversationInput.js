import styles from './ConversationInput.module.scss'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationInput, } from '@store/reducers/conversationReducer/conversationActions'
import {
	closeEditMessageMode,
	closeReplyMessageMode,
	editMessageStart,
	setMessageStart
} from '@store/reducers/messagesReducer/messagesActions'
import { CloseButton, MessageSendButton } from '@components/ui/buttons'
import { MessageEditor } from '@components/ui/editors'
import { RiPencilLine, RiReplyLine } from 'react-icons/ri'
import { getConversationalistsIDs } from '@helpers/getConversationalistsIDs'

export const ConversationInput = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const messages = useSelector(state => state.messages)
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

		dispatch(setMessageStart(data))
		dispatch(setConversationInput(''))
	}

	const sendEditMessageHandler = (e) => {
		e.preventDefault()
		messages.editMessage.message.text = conversation.messageInput

		const data = {
			conversationID: conversation.id,
			message: messages.editMessage.message,
			lastMessage: conversation.data.lastMessage
		}

		dispatch(editMessageStart(data))
		dispatch(setConversationInput(''))
	}

	const sendReplyMessageHandler = (e) => {
		e.preventDefault()

		const data = {
			userID: userID,
			conversationID: conversation.id,
			conversationalists: getConversationalistsIDs(conversations, conversation.id),
			messageText: conversation.messageInput,
			replyMessage: messages.replyMessage.message
		}

		dispatch(setMessageStart(data))
		dispatch(closeReplyMessageMode())
		dispatch(setConversationInput(''))
	}

	const cancelEditMessageHandler = () => {
		dispatch(closeEditMessageMode())
		dispatch(setConversationInput(''))
	}

	const cancelReplyMessageHandler = () => {
		dispatch(closeReplyMessageMode())
		dispatch(setConversationInput(''))
	}

	return (
		messages.editMessage.mode ?
			<form className={styles.wrapper} onSubmit={sendEditMessageHandler}>
				<div className={styles.editMode}>
					<div className={styles.header}>
						<RiPencilLine/>
						<p className={styles.title}>Edit message</p>
						<CloseButton handler={cancelEditMessageHandler}/>
					</div>
					<div className={styles.message} dangerouslySetInnerHTML={{__html: messages.editMessage.message.text}}></div>
				</div>
				<MessageEditor buttonRef={buttonRef} value={conversation.messageInput}/>
				<div className={styles.controls}>
					<MessageSendButton buttonRef={buttonRef}/>
				</div>
			</form>
			: messages.replyMessage.mode ?
				<form className={styles.wrapper} onSubmit={sendReplyMessageHandler}>
					<div className={styles.editMode}>
						<div className={styles.header}>
							<RiReplyLine/>
							<p className={styles.title}>Reply message</p>
							<CloseButton handler={cancelReplyMessageHandler}/>
						</div>
						<div className={styles.message} dangerouslySetInnerHTML={{__html: messages.replyMessage.message.text}}></div>
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
