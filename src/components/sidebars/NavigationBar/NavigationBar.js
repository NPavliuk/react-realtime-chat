import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { UserAvatar } from '@components/ui/avatars'
import { NavigationButton, LogoutButton } from '@components/ui/buttons'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import {
  RiDiscussLine,
  RiDiscussFill,
  RiSettings4Line,
  RiSettings4Fill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiGroupLine,
  RiGroupFill
} from 'react-icons/ri'
import { classNames } from '@helpers/classNames'
import { routeNames } from '@constants/routeNames'
import styles from './NavigationBar.module.scss'
import { closeProfileBar, getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { checkIfMobile } from '@helpers/checkMobile'

export const NavigationBar = () => {
  const navBarRef = useRef()
  const user = useSelector(state => state.user.data)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && navBarRef.current && !navBarRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [open])

  const handleClick = () => {
    setOpen(!open)
  }

  const closeProfileBarHandler = () => {
    const isMobile = checkIfMobile()

    if(isMobile) {
      dispatch(closeProfileBar())
    }
  }

  const openContactBarHandler = () => {
    dispatch(openProfileBar())
    dispatch(getProfileInfoStart(user.uid))
  }

  return (
    <aside>
      <div className={classNames({
        [styles.mainBar]: true,
        [styles.open]: open
      })} ref={navBarRef}>
        <div className={styles.openButton} onClick={handleClick}>
          {open ? <GrFormPrevious/> : <GrFormNext/>}
        </div>
        <div className={styles.mainBarItem}>
          <UserAvatar name={user.displayName} image={user.avatar} status={'online'} handler={() => {handleClick(); openContactBarHandler()}}/>
        </div>
        <div className={styles.mainBarNav}>
          <div className={styles.mainBarItem}>
            <NavigationButton route={routeNames.CONVERSATIONS} icon={<RiDiscussLine/>} activeIcon={<RiDiscussFill/>}
                              indicator={true} handler={() => {handleClick(); closeProfileBarHandler()}}/>
          </div>
          <div className={styles.mainBarItem}>
            <NavigationButton route={routeNames.CONTACTS} icon={<RiGroupLine/>} activeIcon={<RiGroupFill/>}
                              indicator={false} handler={() => {handleClick(); closeProfileBarHandler()}}/>
          </div>
          <div className={styles.mainBarItem}>
            <NavigationButton route={routeNames.BOOKMARKS} icon={<RiBookmarkLine/>} activeIcon={<RiBookmarkFill/>}
                              indicator={false} handler={() => {handleClick(); closeProfileBarHandler()}}/>
          </div>
        </div>
        <div>
          <div className={styles.mainBarItem}>
            <NavigationButton route={routeNames.SETTINGS} icon={<RiSettings4Line/>} activeIcon={<RiSettings4Fill/>}
                              indicator={false} handler={() => {handleClick(); closeProfileBarHandler()}}/>
          </div>
          <div className={styles.mainBarItem}>
            <LogoutButton/>
          </div>
        </div>
      </div>
    </aside>
  )
}
