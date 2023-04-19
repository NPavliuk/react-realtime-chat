import styles from './ConversationMessages.module.scss'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationMessagesSuccess } from '@store/reducers/conversationReducer/conversationActions'
import { DefaultMessage } from '@components/messages'

export const ConversationMessages = ({conversationID}) => {
	const dispatch = useDispatch()
	const messages = useSelector(state => state.conversation.messages)

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

	return (
		<div>
			{
				messages
					? messages.map(message => <DefaultMessage key={message.id} message={message} messages={messages}
																										conversationID={conversationID}/>)
					: null
			}
		</div>
	)
}
