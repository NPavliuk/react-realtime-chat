import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataStart } from '@store/reducers/userReducer/userActions'
import { setSession } from '@store/reducers/authReducer/authActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { auth } from '@api/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getSessionFromLocalStorage, removeSessionFromLocalStorage, saveSessionToLocalStorage } from '@helpers/localStorage'
import { useNavigate } from 'react-router-dom'
import { routeNames } from '@constants/routeNames'
import { getContactsStart } from '@store/reducers/contactsReducer/contactsActions'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector(state => state.auth.id)

  useEffect(() => {
    const userFromStorage = getSessionFromLocalStorage()
    dispatch(setSession(userFromStorage))

    if (!session) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setSession(user.uid))
          dispatch(getUserDataStart(user.uid))
					dispatch(getContactsStart(user.uid))
          saveSessionToLocalStorage(user.uid)
        } else {
          dispatch(setSession(null))
          removeSessionFromLocalStorage()
        }
      })
    }
  }, [])

  document.addEventListener('sign-in', () => navigate(routeNames.CONVERSATIONS))
  document.addEventListener('sign-out', () => navigate(routeNames.HOME))

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
