import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryModal } from '@components/ui/modals'
import { ConversationsBar } from './ConversationsBar/ConversationsBar'
import { AddConversation } from '@views/conversation/Conversations/AddConversation/AddConversation'
import {
	closeAddConversationModal,
	watchConversations
} from '@store/reducers/conversationsReducer/conversationsActions'
import styles from './Conversations.module.scss'
import { collection, documentId, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@api/firebase'
import { getUsers } from '@api/users/getUsers'
import { useEffect } from 'react'

export const Conversations = ({children}) => {
	const data = {
		title: 'Chat - Conversations'
	}

	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const addConversationModal = useSelector(state => state.conversations.addModal)

	const closeAddConversationModalHandler = () => {
		dispatch(closeAddConversationModal())
	}

	useEffect(() => {
		let unsubConversations
		let unsubUserConversations
		let conversationsIDs = []
		const conversationsDbRef = collection(db, 'conversations')
		const userConversationsDbRef = collection(db, `users/${userID}/conversations`)

		if (userID) {
			unsubUserConversations = onSnapshot(userConversationsDbRef, async (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					conversationsIDs.push(doc.id)
				})

				if (conversationsIDs.length > 0) {
					const conversationsData = query(conversationsDbRef, where(documentId(), 'in', conversationsIDs))
					unsubConversations = onSnapshot(conversationsData, async (querySnapshot) => {
						let conversations = []
						querySnapshot.forEach((doc) => {
							conversations.push(doc.data())
						})

						if (conversations.length > 0) {
							await Promise.all(conversations.map(async (conversation) => {
								conversation.conversationalists = await getUsers(conversation.conversationalists)
							}))
						}
						dispatch(watchConversations(conversations))
					})
				}
			})
		}

		return () => {
			unsubConversations()
			unsubUserConversations()
		}
	}, [])


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
