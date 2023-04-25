import styles from './ConversationMessages.module.scss'
import { useEffect, useRef } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { watchConversationMessages } from '@store/reducers/conversationReducer/conversationActions'
import {ConversationMessage} from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessage'

export const ConversationMessages = ({conversationID}) => {
	const dispatch = useDispatch()
	const messages = useSelector(state => state.conversation.messages)
	const messagesListEndRef = useRef()

	useEffect(() => {
		let unsubMessages
		const messagesDbRef = collection(db, `conversations/${conversationID}/messages`)

		if(conversationID) {
			unsubMessages = onSnapshot(messagesDbRef, async (querySnapshot) => {
				let messages = []

				querySnapshot.forEach((doc) => {
					messages.push(doc.data())
				})

				messages.sort(function(x, y){
					return x.date - y.date;
				})

				dispatch(watchConversationMessages(messages))
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
