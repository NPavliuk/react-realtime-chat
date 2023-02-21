import { db } from '@api/firebase'
import { collection, getDocs, query, where, documentId, doc } from 'firebase/firestore'

export const getContacts = async (uid) => {
  const contactsUIDs = []
  const contacts = []
  const usersDbRef = collection(db, 'users')
  const contactsDbRef = collection(db, `relations/${uid}/contacts`)
  const contactsData = await getDocs(contactsDbRef)

  contactsData.forEach((contact) => {
    contactsUIDs.push(contact.id)
  })

  if(contactsUIDs.length > 0) {
    const usersData = query(usersDbRef, where(documentId(), 'in', contactsUIDs))
    const querySnapshot = await getDocs(usersData)

    querySnapshot.forEach((doc) => {
      contacts.push(doc.data())
    })
  }

  return contacts
}
