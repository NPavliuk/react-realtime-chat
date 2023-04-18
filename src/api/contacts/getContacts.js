import { db } from '@api/firebase'
import { collection, getDocs, query, where, documentId } from 'firebase/firestore'

export const getContacts = async (userID) => {
  const contactsIDs = []
  const contacts = []
  const usersDbRef = collection(db, 'users')
  const contactsDbRef = collection(db, `relations/${userID}/contacts`)
  const contactsData = await getDocs(contactsDbRef)

  contactsData.forEach((contact) => {
    contactsIDs.push(contact.id)
  })

  if(contactsIDs.length > 0) {
    const usersData = query(usersDbRef, where(documentId(), 'in', contactsIDs))
    const querySnapshot = await getDocs(usersData)

    querySnapshot.forEach((doc) => {
      contacts.push(doc.data())
    })
  }

  return contacts
}
