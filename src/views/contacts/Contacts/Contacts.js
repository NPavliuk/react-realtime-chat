import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ContactsEmptyState } from './ContactsEmptyState/ContactsEmptyState'
import { PrimaryModal } from '@components/ui/modals'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { getContactsStart, } from '@store/reducers/contactsReducer/contactsActions'
import { closeAddContactModal, openAddContactModal } from '@store/reducers/contactsReducer/contactsActions'
import { ContactsAddModal } from '@views/contacts/Contacts/ContactsAddModal/ContactsAddModal'
import styles from './Contacts.module.scss'
import { ContactsList } from '@views/contacts/Contacts/ContactsList/ContactsList'
import { SearchInput } from '@components/ui/form/inputs'

const data = {
  title: 'Chat - Contacts'
}

export const Contacts = ( ) => {
  const userId = useSelector(state => state.auth.uid)
  const contacts = useSelector(state => state.contacts.contacts)
  const addContactModal = useSelector(state => state.contacts.modals.addContact)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContactsStart(userId))
    dispatch(getUsersStart())
  }, [])


  const closeAddContactModalHandler = () => {
    dispatch(closeAddContactModal())
  }

  const openAddContactModalHandler = () => {
    dispatch(openAddContactModal())
  }

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={styles.layout}>
        {
          contacts.length > 0 ?
            <div className={styles.wrapper}>
              <h2 className={styles.title}>Contacts</h2>
              <div className={styles.search}>
                <SearchInput placeholder={'Find contact...'}/>
              </div>
              <ContactsList contacts={contacts} openHandler={openAddContactModalHandler}/>
            </div>
            :
            <ContactsEmptyState handler={openAddContactModalHandler}/>
        }

        {
          addContactModal ?
            <PrimaryModal isOpen={addContactModal} closeHandler={closeAddContactModalHandler}>
              <ContactsAddModal/>
            </PrimaryModal>
            :
            null
        }
      </div>
    </>
  )
}
