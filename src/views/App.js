import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataStart, setCurrentUser } from '@store/reducers/userReducer/userActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@api/firebase'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.uid)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user.uid))
        // dispatch(getUserDataStart(user.uid))
      } else {
        dispatch(setCurrentUser(null))
      }
    })
  }, [])

  return (
    user ?
      <>
        <PrivateRouter/>
        <PrivateLayout/>
      </>
      :
      <>
        <PublicRouter/>
        <PublicLayout/>
      </>
  )
}

export default App
