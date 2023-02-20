import { useDispatch } from 'react-redux'
import { signOutStart } from '@store/reducers/authReducer/authActions'
import { RiLogoutCircleLine } from 'react-icons/ri'
import styles from './LogoutButton.module.scss'

export const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(signOutStart())
  }

  return (
    <button className={styles.button} type={'button'} onClick={handleClick}>
      <RiLogoutCircleLine />
    </button>
  )
}
