import styles from './ConversationMessages.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ConversationMessage } from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessage'
import { ConversationDate } from '@views/conversation/Conversation/ConversationMessages/ConversationDate/ConversationDate'
import { generateMessages } from '@helpers/messages'

export const ConversationMessages = () => {
	const messagesListEndRef = useRef()
	const conversation = useSelector(state => state.conversation)
	const messages = generateMessages(conversation.messages)

	useEffect(() => {
		messagesListEndRef.current.scrollIntoView()
	})

	return (
		<div className={styles.wrapper}>
			{
				conversation.messages
					? messages.map(message => message.type !== 'day'
						? <ConversationMessage key={message.id} message={message} conversation={conversation}/>
						: <ConversationDate key={message.id} date={message.date} />)
					: null
			}
			<div ref={messagesListEndRef}></div>
		</div>
	)
}
