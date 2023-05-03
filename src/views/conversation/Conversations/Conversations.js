import styles from './Conversations.module.scss'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryModal } from '@components/ui/modals'
import { ConversationsBar } from './ConversationsBar/ConversationsBar'
import { AddConversation } from '@views/conversation/Conversations/AddConversation/AddConversation'
import { closeAddConversationModal, watchConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'

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
