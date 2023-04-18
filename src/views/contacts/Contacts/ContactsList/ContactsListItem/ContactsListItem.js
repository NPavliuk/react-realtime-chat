import { useDispatch, useSelector } from 'react-redux'
import { removeContactStart } from '@store/reducers/contactsReducer/contactsActions'
import styles from './ContactsListItem.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { CancelButton, PrimaryButton } from '@components/ui/buttons'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'

export const ContactsListItem = ({contact}) => {
  const dispatch = useDispatch()
  const userID = useSelector(state =>  state.auth.id)

  const removeContactHandler = () => {
    const data = {
      userID: userID,
      contact: contact
    }

    dispatch(removeContactStart(data))
  }

  const openContactBarHandler = () => {
    dispatch(openProfileBar())
    dispatch(getProfileInfoStart(contact.id))
  }

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.avatar}>
          <UserAvatar image={contact.avatar} name={contact.name} modifyClass={'medium'} handler={openContactBarHandler}/>
        </div>
        <div className={styles.content}>
          <h5 className={styles.title}>{contact.name}</h5>
          {
            contact.role
							? <p className={styles.description}>{contact.role}</p>
              : <p className={styles.description}>{contact.email}</p>
          }
        </div>
        <div className={styles.controls}>
          <PrimaryButton title={'Message'}/>
          <CancelButton title={'Remove'} handler={removeContactHandler}/>
        </div>
      </div>
    </div>
  )
}
