import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryModal } from '@components/ui/modals'
import { ConversationsBar } from './ConversationsBar/ConversationsBar'
import { AddConversation } from '@views/conversation/Conversations/AddConversation/AddConversation'
import { closeAddConversationModal } from '@store/reducers/conversationsReducer/conversationsActions'
import styles from './Conversations.module.scss'

export const Conversations = ({children}) => {
	const data = {
		title: 'Chat - Conversations'
	}

	const dispatch = useDispatch()
	const addConversationModal = useSelector(state => state.conversations.addModal)

	const closeAddConversationModalHandler = () => {
		dispatch(closeAddConversationModal())
	}

	return (
		<>
			<Helmet>
				<title>{data.title}</title>
			</Helmet>
			<div className={styles.wrapper}>
					<ConversationsBar/>
					{children}
				{
					addConversationModal ?
						<PrimaryModal isOpen={addConversationModal} closeHandler={closeAddConversationModalHandler}>
							<AddConversation closeHandler={closeAddConversationModalHandler}/>
						</PrimaryModal>
						:
						null
				}
			</div>
		</>
	)
}

// TODO: Hide ConversationsBar and Conversation if user don't have any conversations.
// 	Show instead empty state page with button for adding new conversation
