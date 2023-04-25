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
