import { onDisconnect, onValue, ref, serverTimestamp, set } from 'firebase/database'
import { rtdb } from '@api/firebase'

export const watchUserStatus = (userID) => {
	const userStatusRef = ref(rtdb, '/status/' + userID)

	const isOfflineForDatabase = {
		id: userID,
		state: 'offline',
		last_changed: serverTimestamp()
	}

	const isOnlineForDatabase = {
		id: userID,
		state: 'online',
		last_changed: serverTimestamp()
	}

	const infoConnected = ref(rtdb, '.info/connected')
	onValue(infoConnected, async (snapshot) => {
		if (snapshot.val() !== false) {
			onDisconnect(userStatusRef).set(isOfflineForDatabase).then(async () => {
				await set(userStatusRef, isOnlineForDatabase)
			})
		}
	})
}
