import styles from './ConversationMessages.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ConversationMessage } from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessage'
import { ConversationDate } from '@views/conversation/Conversation/ConversationMessages/ConversationDate/ConversationDate'
import { generateMessages } from '@helpers/messages'

export const ConversationMessages = () => {
	const messagesRef = useRef()
	const conversation = useSelector(state => state.conversation)
	const messages = useSelector(state => state.messages.messages)
	const generatedMessages = generateMessages(messages)

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight
		}
	})

	return (
		<div className={styles.wrapper}
				 ref={messagesRef}
		>
			{
				messages
					? generatedMessages.map(message => message.type !== 'day'
						? <ConversationMessage key={message.id}
																	 message={message}
																	 conversation={conversation}
																	 messages={generatedMessages}
						/>
						: <ConversationDate key={message.id}
																date={message.date}
						/>)
					: null
			}
		</div>
	)
}
