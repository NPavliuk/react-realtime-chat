import { useDispatch } from 'react-redux'
import { signOutStart } from '@store/reducers/userReducer/userActions'

export const Home = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(signOutStart())
  }

  return(
    <div>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}
