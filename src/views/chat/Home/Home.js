import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutStart } from '@store/reducers/authReducer/authActions'
import { routeNames } from '@constants/routeNames'

export const Home = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(signOutStart())
  }

  return (
    <div>
      <button onClick={handleClick}>logout</button>
      <Link to={routeNames.SETTINGS}>Setings</Link>
    </div>
  )
}
