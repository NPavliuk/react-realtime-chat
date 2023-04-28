import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { watchSessionStart } from '@store/reducers/authReducer/authActions'
import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'

function App() {
  const dispatch = useDispatch()
  const session = useSelector(state => state.auth.id)

  useEffect(() => {
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
