import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@api/firebase'

export function watchAuthSession(eventChannel) {
	return eventChannel((emit) => {
		const unsubscribe = onAuthStateChanged(auth, (user, error) => {
			user ? emit(user) : emit('null')
		})

		return () => unsubscribe
	})
}
