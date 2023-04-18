import styles from './ConversationMessages.module.scss'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationMessagesSuccess } from '@store/reducers/conversationReducer/conversationActions'
import { DefaultMessage } from '@components/messages'

export const ConversationMessages = ({conversationID}) => {
	const dispatch = useDispatch()
	const userId = useSelector(state =>  state.auth.id)
	const messages = useSelector(state => state.conversation.messages)

	useEffect(() => {
		const getMessages = async () => {
			let unsubMessages
			const messagesDbRef = doc(db, 'messages', conversationID)

			unsubMessages = onSnapshot(messagesDbRef, async (doc) => {
				if (doc.exists()) {
					dispatch(getConversationMessagesSuccess(doc.data().messages))
				}
			})

			return () => {
				unsubMessages()
			}
		}

		userId && conversationID && getMessages()
	}, [conversationID])

	return (
		<div>
			{
				messages
					? messages.map(message => <DefaultMessage key={message.id} message={message}
																										conversationID={conversationID}/>)
					: null
			}
		</div>
	)
}
