import styles from './Conversations.module.scss'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryModal } from '@components/ui/modals'
import { closeAddConversationModal, watchConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { AddConversation } from '@views/conversation/Conversations/AddConversation/AddConversation'
import { ConversationsBar } from '@views/conversation/Conversations/ConversationsBar/ConversationsBar'

const data = {
	title: 'Chat - Conversations'
}

export const Conversations = ({children}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const addConversationModal = useSelector(state => state.conversations.addModal)

	useEffect(() => {
		dispatch(watchConversationsStart(userID))
	}, [])

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
						<PrimaryModal isOpen={addConversationModal}
													closeHandler={closeAddConversationModalHandler}
						>
							<AddConversation closeHandler={closeAddConversationModalHandler}/>
						</PrimaryModal>
						:
						null
				}
			</div>
		</>
	)
}
