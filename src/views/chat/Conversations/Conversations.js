import { ConversationsBar } from './ConversationsBar/ConversationsBar'
import { Helmet } from 'react-helmet'
import styles from './Conversations.module.scss'
import { PrimaryModal } from '@components/ui/modals'
import { useDispatch, useSelector } from 'react-redux'
import { ConversationAddModal } from '@views/chat/Conversations/ConversationAddModal/ConversationAddModal'
import { closeAddConversationModal } from '@store/reducers/conversationsReducer/conversationsActions'

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
      <div children={styles.wrapper}>
        <ConversationsBar/>
        {children}

        {
          addConversationModal ?
            <PrimaryModal isOpen={addConversationModal} closeHandler={closeAddConversationModalHandler}>
              <ConversationAddModal closeHandler={closeAddConversationModalHandler}/>
            </PrimaryModal>
            :
            null
        }

      </div>
    </>
  )
}
