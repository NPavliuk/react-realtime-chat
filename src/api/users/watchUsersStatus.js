import { rtdb } from '@api/firebase'
import { onValue, ref } from 'firebase/database'

export const watchUsersStatus = (eventChannel) => {
	return eventChannel((emit) => {
		const usersStatusesRef = ref(rtdb, '/status/')

		const unsub = onValue(usersStatusesRef, (snapshot) => {
			const onlineUsers = Object.values(snapshot.val()).filter(doc => doc.state === 'online')

			emit(onlineUsers)
		})

		return () => unsub
	})
}
