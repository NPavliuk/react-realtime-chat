import styles from './ConversationsBar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import {
	openAddConversationModal, watchConversations
} from '@store/reducers/conversationsReducer/conversationsActions'
import { useEffect } from 'react'
import {
	ConversationsList
} from '@views/conversation/Conversations/ConversationsBar/ConversationsList/ConversationsList'
import { collection, query, where, documentId, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { getUsers } from '@api/users/getUsers'

export const ConversationsBar = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)

	// TODO: Transfer listeners to separate file
	useEffect(() => {
		let unsubConversations
		let unsubUserConversations
		let conversationsUIDs = []
		const conversationsDbRef = collection(db, 'conversations')
		const userConversationsDbRef = collection(db, `users/${userID}/conversations`)

		if (userID) {
			unsubUserConversations = onSnapshot(userConversationsDbRef, async (querySnapshot) => {
				querySnapshot.forEach((doc) => {
					conversationsUIDs.push(doc.id)
				})

				if (conversationsUIDs.length > 0) {
					const conversationsData = query(conversationsDbRef, where(documentId(), 'in', conversationsUIDs))
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
			// unsubConversations()
			unsubUserConversations()
		}
	}, [userID])

	const openAddConversationModalHandler = () => {
		dispatch(openAddConversationModal())
	}

	return (
		<aside className={styles.wrapper}>
			<div className={styles.header}>
				<h1 className={styles.title}>Conversations</h1>
			</div>

			<ConversationsList/>

			<div className={styles.button}>
				<PrimaryButton title={'New conversation'} handler={openAddConversationModalHandler}/>
			</div>
		</aside>
	)
}
