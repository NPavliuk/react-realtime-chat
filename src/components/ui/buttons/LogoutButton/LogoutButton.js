import styles from './LogoutButton.module.scss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOutStart } from '@store/reducers/authReducer/authActions'
import { RiLogoutCircleLine } from 'react-icons/ri'

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
