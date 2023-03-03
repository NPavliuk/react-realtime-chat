import styles from './ConversationsBar.module.scss'
import { PrimaryButton } from '@components/ui/buttons'
import { useDispatch } from 'react-redux'
import { openAddConversationModal } from '@store/reducers/conversationsReducer/conversationsActions'

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

      <div>
        <PrimaryButton title={'New conversation'} handler={openAddConversationModalHandler}/>
      </div>
    </aside>
  )
}
