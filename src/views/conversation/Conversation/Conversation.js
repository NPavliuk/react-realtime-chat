import styles from './Conversation.module.scss'
import { Conversations } from '@views/conversation/Conversations/Conversations'
import { ConversationMessages } from '@views/conversation/Conversation/ConversationMessages/ConversationMessages'
import { ConversationInput } from '@views/conversation/Conversation/ConversationInput/ConversationInput'
import { ConversationHead } from '@views/conversation/Conversation/ConversationHead/ConversationHead'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { chooseConversation } from '@store/reducers/conversationReducer/conversationActions'

export const Conversation = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const locationPath = location.pathname.split('/')
	const conversationID = locationPath[locationPath.length - 1]

	useEffect(() => {
		dispatch(chooseConversation(conversationID))
	}, [location])

  return (
    <Conversations>
			<div className={styles.wrapper}>
				<ConversationHead conversationID={conversationID} />
				<ConversationMessages conversationID={conversationID} />
				<ConversationInput />
			</div>
    </Conversations>
  )
}
