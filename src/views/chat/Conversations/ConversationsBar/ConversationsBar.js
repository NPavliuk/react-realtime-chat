import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import {
	getAllConversationsStart,
	openAddConversationModal
} from '@store/reducers/conversationsReducer/conversationsActions'
import styles from './ConversationsBar.module.scss'
import { useEffect } from 'react'
import { ConversationsList } from '@views/chat/Conversations/ConversationsList/ConversationsList'

export const ConversationsBar = () => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.uid)

	useEffect(() => {
		dispatch(getAllConversationsStart(userId))
	}, [])

	const openAddConversationModalHandler = () => {
		dispatch(openAddConversationModal())
	}

	return (
    <aside className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Conversations</h1>
      </div>

			<ConversationsList />

			<div className={styles.button}>
				<PrimaryButton title={'New conversation'} handler={openAddConversationModalHandler}/>
			</div>
    </aside>
  )
}
