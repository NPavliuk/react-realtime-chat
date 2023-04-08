import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataStart } from '@store/reducers/userReducer/userActions'
import { setAuthStatus } from '@store/reducers/authReducer/authActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { auth } from '@api/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from '@helpers/localStorage'
import { useNavigate } from 'react-router-dom'
import { routeNames } from '@constants/routeNames'
import { getContactsStart } from '@store/reducers/contactsReducer/contactsActions'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.uid)

  useEffect(() => {
    const userFromStorage = getUserFromLocalStorage()
    dispatch(setAuthStatus(userFromStorage))

    if (!user) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setAuthStatus(user.uid))
          dispatch(getUserDataStart(user.uid))
          dispatch(getContactsStart(user.uid))
          saveUserToLocalStorage(user.uid)
        } else {
          dispatch(setAuthStatus(null))
          removeUserFromLocalStorage()
        }
      })
    }
  }, [])

  document.addEventListener('sign-in', () => navigate(routeNames.CONVERSATIONS))
  document.addEventListener('sign-out', () => navigate(routeNames.HOME))

  return (
    user ?
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
