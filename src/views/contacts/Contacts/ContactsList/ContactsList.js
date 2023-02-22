import { ContactsListItem } from '@views/contacts/Contacts/ContactsList/ContactsListItem/ContactsListItem'
import { RiAddFill } from 'react-icons/ri'
import styles from './ContactsList.module.scss'

export const ContactsList = ({contacts, openHandler}) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={openHandler}>
        <span className={styles.buttonIcon}>
          <RiAddFill />
        </span>
      </button>
      {contacts.map(contact => <ContactsListItem key={contact.uid} contact={contact}/>)}
      {/*{contacts.map(contact => <ContactsListItem key={contact.uid} contact={contact}/>)}*/}
      {/*{contacts.map(contact => <ContactsListItem key={contact.uid} contact={contact}/>)}*/}
    </div>
  )
}
