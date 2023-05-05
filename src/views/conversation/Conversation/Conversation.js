import styles from './Conversation.module.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { chooseConversation, watchConversationStart } from '@store/reducers/conversationReducer/conversationActions'
import { watchMessagesStart } from '@store/reducers/messagesReducer/messagesActions'
import { Conversations } from '@views/conversation/Conversations/Conversations'
import { ConversationMessages } from '@views/conversation/Conversation/ConversationMessages/ConversationMessages'
import { ConversationInput } from '@views/conversation/Conversation/ConversationInput/ConversationInput'
import { ConversationHead } from '@views/conversation/Conversation/ConversationHead/ConversationHead'
import { ConversationBar } from '@views/conversation/Conversation/ConversationBar/ConversationBar'
import { checkIfTablet } from '@helpers/checkResolution'

export const Conversation = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const locationPath = location.pathname.split('/')
	const conversationID = locationPath[locationPath.length - 1]
	const isTablet = checkIfTablet()

	useEffect(() => {
		dispatch(chooseConversation(conversationID))
	}, [location])

	useEffect(() => {
		if (conversationID) {
			dispatch(watchConversationStart(conversationID))
			dispatch(watchMessagesStart(conversationID))
		}
	}, [conversationID])

	return (
		isTablet ?
			<div className={styles.mobileWrapper}>
				<div className={styles.wrapper}>
					<ConversationHead/>
					<ConversationMessages/>
					<ConversationInput/>
				</div>
				<ConversationBar/>
			</div>
			:
			<Conversations>
				<div className={styles.wrapper}>
					<ConversationHead/>
					<ConversationMessages/>
					<ConversationInput/>
				</div>
				<ConversationBar/>
			</Conversations>
	)
}
