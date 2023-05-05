import styles from './LogoutButton.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOutStart } from '@store/reducers/authReducer/authActions'
import { RiLogoutCircleLine } from 'react-icons/ri'

export const LogoutButton = () => {
	const navigate = useNavigate()
  const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)

  const handleClick = () => {
		const data = {
			userID: userID,
			navigate: navigate
		}
    dispatch(signOutStart(data))
  }

  return (
    <button className={styles.button} type={'button'} onClick={handleClick}>
      <RiLogoutCircleLine />
    </button>
  )
}
