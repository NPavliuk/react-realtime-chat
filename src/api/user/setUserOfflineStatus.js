import { rtdb } from '@api/firebase'
import { ref, serverTimestamp, set } from 'firebase/database'

export const setUserOfflineStatus = async (userID) => {
	const userStatusRef = ref(rtdb, '/status/' + userID)

	const isOfflineForDatabase = {
		id: userID,
		state: 'offline',
		last_changed: serverTimestamp()
	}

	try {
		await set(userStatusRef, isOfflineForDatabase)
	} catch (error) {
		return error.message
	}
}
