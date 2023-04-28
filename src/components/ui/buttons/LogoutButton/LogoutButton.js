import { useDispatch } from 'react-redux'
import { signOutStart } from '@store/reducers/authReducer/authActions'
import { RiLogoutCircleLine } from 'react-icons/ri'
import styles from './LogoutButton.module.scss'
import { useNavigate } from 'react-router-dom'

export const LogoutButton = () => {
	const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(signOutStart(navigate))
  }

  return (
    <button className={styles.button} type={'button'} onClick={handleClick}>
      <RiLogoutCircleLine />
    </button>
  )
}
