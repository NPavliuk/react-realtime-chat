import styles from './Conversation.module.scss'
import { Conversations } from '@views/conversation/Conversations/Conversations'
import { ConversationMessages } from '@views/conversation/Conversation/ConversationMessages/ConversationMessages'
import { ConversationInput } from '@views/conversation/Conversation/ConversationInput/ConversationInput'
import { ConversationHead } from '@views/conversation/Conversation/ConversationHead/ConversationHead'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	chooseConversation,
	watchConversation,
	watchConversationMessages
} from '@store/reducers/conversationReducer/conversationActions'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { getUsers } from '@api/users/getUsers'

export const Conversation = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const locationPath = location.pathname.split('/')
	const conversationID = locationPath[locationPath.length - 1]

	useEffect(() => {
		dispatch(chooseConversation(conversationID))
	}, [location])

	useEffect(() => {
		let unsubMessages
		let unsubConversation
		const conversationRef = doc(db, `conversations`, conversationID )
		const messagesDbRef = collection(db, `conversations/${conversationID}/messages`)

		if(conversationID) {
			unsubConversation = onSnapshot(conversationRef, async (doc) => {
				const conversation = doc.data()

				if(conversation) {
					conversation.conversationalists = await getUsers(conversation.conversationalists)
				}

				dispatch(watchConversation(conversation))
			})

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
			unsubConversation()
		}
	}, [conversationID])

  return (
    <Conversations>
			<div className={styles.wrapper}>
				<ConversationHead />
				<ConversationMessages />
				<ConversationInput />
			</div>
    </Conversations>
  )
}
