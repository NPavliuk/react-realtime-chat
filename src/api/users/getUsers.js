import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getUsers = async (usersIDs) => {
	const users = []
	const usersDbRef = collection(db, 'users')
	const usersData = query(usersDbRef, where(documentId(), 'in', usersIDs))

	if(usersIDs.length > 0) {
		const querySnapshot = await getDocs(usersData)
		querySnapshot.forEach((doc) => {
			users.push(doc.data())
		})
	}

	return users
}
