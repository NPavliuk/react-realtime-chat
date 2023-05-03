import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalSession, watchSessionStart } from '@store/reducers/authReducer/authActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { getSessionFromLocalStorage } from '@helpers/localStorage'

function App() {
	const dispatch = useDispatch()
	const session = useSelector(state => state.auth.id)

	useEffect(() => {
		if (!session) {
			const localSession = getSessionFromLocalStorage()

			if (localSession) {
				dispatch(setLocalSession(localSession))
			}
		}

		dispatch(watchSessionStart())
	}, [])

	return (
		session ?
			<PrivateLayout>
				<PrivateRouter/>
			</PrivateLayout>
			:
			<PublicLayout>
				<PublicRouter/>
			</PublicLayout>
	)
}

export default App
