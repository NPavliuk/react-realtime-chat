import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CancelButton, PrimaryButton, TypeButton } from '@components/ui/buttons'
import { AddDirectConversationForm } from '@views/chat/Conversations/ConversationAddModal/AddDirectConversationForm/AddDirectConversationForm'
import { RiUserLine, RiGroupLine } from 'react-icons/ri'
import { routeNames } from '@constants/routeNames'
import styles from './ConversationAddModal.module.scss'

export const ConversationAddModal = ({closeHandler}) => {
  const [directForm, setDirectForm] = useState(false)
  const [groupForm, setGroupForm] = useState(false)
  const contacts = useSelector(state => state.contacts.contacts)

  const directButtonClickHandler = () => {
    setDirectForm(true)
    setGroupForm(false)
  }

  const groupButtonClickHandler = () => {
    setDirectForm(false)
    setGroupForm(true)
  }

  const closeButtonClickHandler = () => {
    setDirectForm(false)
    setGroupForm(false)
    closeHandler()
  }

  return (
    <div className={styles.wrapper}>
      {
        contacts.length > 0 ?
          !directForm && !groupForm ?
            <div className={styles.content}>
              <h3 className={styles.title}>New conversation</h3>
              <p className={styles.note}>Please select the type of conversation you want to create</p>

              <div className={styles.controls}>
                <TypeButton title={'Direct conversation'} icon={<RiUserLine/>} handler={directButtonClickHandler}
                            description={'A direct conversation refers to a conversation between two people'}/>
                <TypeButton title={'Group conversation'} icon={<RiGroupLine/>} handler={groupButtonClickHandler}
                            description={'Group conversations involve multiple participants'}/>
                <div className={styles.cancel}>
                  <CancelButton title={'Cancel'} handler={closeButtonClickHandler}/>
                </div>
              </div>
            </div>
            : directForm ?
              <div className={styles.content}>
                <h3 className={styles.title}>New direct conversation</h3>
                <p className={styles.note}>Please select a contact with whom you want to start a conversation</p>
                <AddDirectConversationForm closeHandler={closeButtonClickHandler}/>
              </div>
              : groupForm ?
                <div className={styles.content}>
                  <h3 className={styles.title}>New group conversation</h3>
                  <p className={styles.note}>Group conversations are best when organized around a topic - #rest, for
                    example</p>

                  <div className={styles.controls}>
                    <div className={styles.cancel}>
                      <CancelButton title={'Cancel'} handler={closeButtonClickHandler}/>
                    </div>
                  </div>
                </div>
                :
                null
          :
            <div className={styles.content}>
              <h3 className={styles.title}>Cannot create a conversation</h3>
              <p className={styles.note}>You cannot create a conversation until you have any contacts. You can add contact using button below</p>

              <div className={styles.controls}>
                <PrimaryButton title={'Add contact'} link={routeNames.CONTACTS} handler={closeButtonClickHandler} />
              </div>
            </div>
      }
    </div>
  )
}
