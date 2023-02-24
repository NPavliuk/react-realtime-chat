import { ContactsListItem } from '@views/contacts/Contacts/ContactsList/ContactsListItem/ContactsListItem'
import styles from './ContactsList.module.scss'

export const ContactsList = ({contacts}) => {
  return (
    <div className={styles.wrapper}>
      {contacts.map(contact => <ContactsListItem key={contact.uid} contact={contact}/>)}
    </div>
  )
}
