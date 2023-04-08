import { collection, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '@api/firebase'

export const getUsers = async (uids) => {
	const users = []
	const usersDbRef = collection(db, 'users')

	if(uids.length > 0) {
		const usersData = query(usersDbRef, where(documentId(), 'in', uids))
		const querySnapshot = await getDocs(usersData)

		querySnapshot.forEach((doc) => {
			users.push(doc.data())
		})
	}

	return users
}
