import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { LogoSpinner } from '@components/ui/spinners'
import { watchConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { setLocalSession, watchSessionStart } from '@store/reducers/authReducer/authActions'
import { watchUsersStatusStart } from '@store/reducers/usersReducer/usersActions'
import { getSessionFromLocalStorage } from '@helpers/localStorage'

function App() {
	const dispatch = useDispatch()
	const session = useSelector(state => state.auth)
	let localSession = getSessionFromLocalStorage()

	useEffect(() => {
		if (!session.id && localSession) {
			dispatch(setLocalSession(localSession))
		}

		dispatch(watchSessionStart())
		dispatch(watchUsersStatusStart())

		if (session.id) {
			dispatch(watchConversationsStart(session.id))
		}
	}, [session.id])

	return (
		localSession && session.loading
			? <LogoSpinner/>
			: session.id ?
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
