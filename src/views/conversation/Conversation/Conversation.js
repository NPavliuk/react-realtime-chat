import styles from './Conversation.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { PrimaryModal } from '@components/ui/modals'
import {
	chooseConversation,
	closeAddInterlocutorModal,
	closeEditConversationModal,
	watchConversationStart
} from '@store/reducers/conversationReducer/conversationActions'
import { watchMessagesStart } from '@store/reducers/messagesReducer/messagesActions'
import { Conversations } from '@views/conversation/Conversations/Conversations'
import { ConversationMessages } from '@views/conversation/Conversation/ConversationMessages/ConversationMessages'
import { ConversationInput } from '@views/conversation/Conversation/ConversationInput/ConversationInput'
import { ConversationHead } from '@views/conversation/Conversation/ConversationHead/ConversationHead'
import { ConversationBar } from '@views/conversation/Conversation/ConversationBar/ConversationBar'
import { checkIfTablet } from '@helpers/checkResolution'
import { AddInterlocutor } from '@views/conversation/Conversation/AddInterlocutor/AddInterlocutor'
import { ConversationEdit } from '@views/conversation/Conversation/ConversationEdit/ConversationEdit'

export const Conversation = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const conversation = useSelector(state => state.conversation)
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

	const closeAddInterlocutorModalHandler = () => {
		dispatch(closeAddInterlocutorModal())
	}

	const closeEditConversationModalHandler = () => {
		dispatch(closeEditConversationModal())
	}

	const outputHTML = () => {
		return (
			<>
				<div className={styles.wrapper}>
					<ConversationHead/>
					<ConversationMessages/>
					<ConversationInput/>
				</div>
				<ConversationBar/>
				{
					conversation.addModal ?
						<PrimaryModal isOpen={conversation.addModal}
													closeHandler={closeAddInterlocutorModalHandler}
						>
							<AddInterlocutor closeHandler={closeAddInterlocutorModalHandler}/>
						</PrimaryModal>
						:
						null
				}
				{
					conversation.editModal ?
						<PrimaryModal isOpen={conversation.editModal}
													closeHandler={closeEditConversationModalHandler}
						>
							<ConversationEdit closeHandler={closeEditConversationModalHandler}/>
						</PrimaryModal>
						:
						null
				}
			</>
		)
	}

	return (
		isTablet ?
			<div className={styles.mobileWrapper}>
				{outputHTML()}
			</div>
			:
			<Conversations>
				{outputHTML()}
			</Conversations>
	)
}
