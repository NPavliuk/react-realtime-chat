import styles from './ConversationsBar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import { getAllConversationsSuccess, openAddConversationModal } from '@store/reducers/conversationsReducer/conversationsActions'
import { useEffect } from 'react'
import { ConversationsList } from '@views/chat/Conversations/ConversationsList/ConversationsList'
import { collection, query, where, documentId, onSnapshot } from 'firebase/firestore'
import { db } from '@api/firebase'
import { getUsers } from '@api/user/getUsers'

export const ConversationsBar = () => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.uid)

	// TODO: Transfer listeners to separate file
	useEffect(() => {
		const getConversations = async () => {
			let unsubConversations
			let unsubUserConversations
			const conversationsDbRef = collection(db, 'conversations')
			const userConversationsDbRef = collection(db, `relations/${userId}/conversations`)

			unsubUserConversations = onSnapshot(userConversationsDbRef, async (querySnapshot) => {
				let conversationsUIDs = []
				querySnapshot.forEach((doc) => {
					conversationsUIDs.push(doc.id)
				})

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
					dispatch(getAllConversationsSuccess(conversations))
				})
			})

			return () => {
				unsubConversations()
				unsubUserConversations()
			}
		}

		userId && getConversations()
	}, [userId])

	// useEffect(() => {
	// 	dispatch(getAllConversationsStart(userId))
	// }, [userId])

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
