import styles from './ConversationMessages.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ConversationMessage } from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessage'

export const ConversationMessages = () => {
	const messagesListEndRef = useRef()
	const conversation = useSelector(state => state.conversation)

	useEffect(() => {
		messagesListEndRef.current.scrollIntoView()
	})

	return (
		<div className={styles.wrapper}>
			{
				conversation.messages
					? conversation.messages.map(message => <ConversationMessage key={message.id} message={message} conversation={conversation}/>)
					: null
			}
			<div ref={messagesListEndRef}></div>
		</div>
	)
}
