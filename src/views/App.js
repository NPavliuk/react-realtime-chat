import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataStart } from '@store/reducers/userReducer/userActions'
import { setAuthStatus } from '@store/reducers/authReducer/authActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@api/firebase'
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from '@helpers/localStorage'

function App() {
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
          saveUserToLocalStorage(user.uid)
        } else {
          dispatch(setAuthStatus(null))
          removeUserFromLocalStorage()
        }
      })
    }
  }, [])

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
