import { doc, getDoc } from 'firebase/firestore'
import { db } from '@api/firebase'

export const checkContact = async (userID, contactID) => {
	let docSnap
  const docRef = doc(db, `relations/${userID}/contacts`, contactID)

	try {
		docSnap = await getDoc(docRef)
	} catch (error) {
		return error.message
	}

  return docSnap.exists()
}
