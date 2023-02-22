import styles from './ProfileBar.module.scss'
import { classNames } from '@helpers/classNames'
import { useDispatch, useSelector } from 'react-redux'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'

export const ProfileBar = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.profile.isOpen)

  const closeContactBarHandler = () => {
    dispatch(closeProfileBar())
  }

  return (
    <div className={classNames({
      [styles.wrapper]: true,
      [styles.active]: isOpen,
    })}>
      <div>Info</div>
      <button onClick={closeContactBarHandler}>close</button>
    </div>
  )
}
