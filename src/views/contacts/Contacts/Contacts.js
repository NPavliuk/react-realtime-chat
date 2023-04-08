import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ContactsEmptyState } from './ContactsEmptyState/ContactsEmptyState'
import { PrimaryModal } from '@components/ui/modals'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import {clearContactsSearchValue,getContactsStart,setContactsSearchValue} from '@store/reducers/contactsReducer/contactsActions'
import { closeAddContactModal, openAddContactModal } from '@store/reducers/contactsReducer/contactsActions'
import { ContactsAddModal } from '@views/contacts/Contacts/ContactsAddModal/ContactsAddModal'
import styles from './Contacts.module.scss'
import { ContactsList } from '@views/contacts/Contacts/ContactsList/ContactsList'
import { SearchInput } from '@components/ui/form/inputs'
import { CancelButton, PrimaryButton } from '@components/ui/buttons'
import { ContactsEmptySearchState } from '@views/contacts/Contacts/ContactsEmptySearchState/ContactsEmptySearchState'

const data = {
  title: 'Chat - Contacts'
}

export const Contacts = () => {
  const userId = useSelector(state => state.auth.uid)
  const contacts = useSelector(state => state.contacts.contacts)
  const addContactModal = useSelector(state => state.contacts.addModal)
  const searchValue = useSelector(state => state.contacts.searchValue)

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

  const searchHandler = (e) => {
    const value = e.target.value
    dispatch(setContactsSearchValue(value))
  }

  const clearSearchHandler = () => {
    dispatch(clearContactsSearchValue())
  }

  const searchContacts = () => {
    const res = contacts.filter(contact =>
      contact.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchValue.toLowerCase()) ?
        contact : null)
    return res
  }

  const searchedContacts = searchContacts()

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={styles.layout}>
        {
          contacts.length > 0 ?
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <h2 className={styles.title}>Contacts</h2>
                <PrimaryButton handler={openAddContactModalHandler} modifyClass={'auto'} title={'Add contact'}/>
              </div>
              <div className={styles.content}>
                <div className={styles.search}>
                  <SearchInput handler={searchHandler} value={searchValue} placeholder={'Find contact...'}/>
                  <CancelButton handler={clearSearchHandler} modifyClass={'auto'} title={'Clear'}/>
                </div>
                {
                  searchValue !== '' && searchedContacts.length > 0 ?
                    <ContactsList contacts={searchedContacts}/>
                    : searchedContacts.length === 0 ?
                      <div className={styles.emptyState}>
                        <ContactsEmptySearchState value={searchValue}/>
                      </div>
                      : <ContactsList contacts={contacts}/>
                }
              </div>
            </div>
            :
            <div className={styles.emptyState}>
              <ContactsEmptyState handler={openAddContactModalHandler}/>
            </div>
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
