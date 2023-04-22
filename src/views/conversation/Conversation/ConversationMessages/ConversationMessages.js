import styles from './ConversationMessages.module.scss'
import { useEffect, useRef } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationMessagesSuccess } from '@store/reducers/conversationReducer/conversationActions'
import {ConversationMessage} from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessage'

export const ConversationMessages = ({conversationID}) => {
	const dispatch = useDispatch()
	const messages = useSelector(state => state.conversation.messages)
	const messagesListEndRef = useRef()

	useEffect(() => {
		let unsubMessages
		const messagesDbRef = doc(db, 'messages', conversationID)

		if(conversationID) {
			unsubMessages = onSnapshot(messagesDbRef, async (doc) => {
				if (doc.exists()) {
					dispatch(getConversationMessagesSuccess(doc.data().messages))
				}
			})
		}

		return () => {
			unsubMessages()
		}
	}, [conversationID])

	useEffect(() => {
		messagesListEndRef.current.scrollIntoView()
	})

	return (
		<div className={styles.wrapper}>
			{
				messages
					? messages.map(message => <ConversationMessage key={message.id} message={message} messages={messages}
																										conversationID={conversationID}/>)
					: null
			}
			<div ref={messagesListEndRef}></div>
		</div>
	)
}
