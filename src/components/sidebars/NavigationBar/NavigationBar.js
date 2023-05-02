import styles from './NavigationBar.module.scss'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { RiDiscussLine, RiDiscussFill, RiSettings4Line, RiSettings4Fill, RiBookmarkLine, RiBookmarkFill, } from 'react-icons/ri'
import { UserAvatar } from '@components/ui/avatars'
import { NavigationButton, LogoutButton } from '@components/ui/buttons'
import { closeProfileBar, getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { classNames } from '@helpers/classNames'
import { checkIfMobile } from '@helpers/checkResolution'
import { routeNames } from '@constants/routeNames'
import { isUnreadConversations } from '@helpers/messages'

export const NavigationBar = () => {
	const dispatch = useDispatch()
  const navBarRef = useRef()
  const [open, setOpen] = useState(false)
  const isMobile = checkIfMobile()

	const user = useSelector(state => state.user.data)
	const conversationID =  useSelector(state => state.conversation.id)
	const conversations = useSelector(state => state.conversations.conversations)

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

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(user.id))
	}

  const closeProfileBarHandler = () => {
    const isMobile = checkIfMobile()

    if(isMobile) {
      dispatch(closeProfileBar())
    }
  }

	const isUnread = isUnreadConversations(conversations, user.id)

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
          <UserAvatar name={user.name} image={user.avatar} status={'online'} handler={() => {handleClick(); openProfileBarHandler()}}/>
        </div>
        <div className={styles.mainBarNav}>
          <div className={styles.mainBarItem}>
            <NavigationButton route={conversationID ? `${routeNames.CONVERSATIONS}/${conversationID}` : routeNames.CONVERSATIONS} icon={<RiDiscussLine/>} activeIcon={<RiDiscussFill/>}
                              indicator={isUnread} handler={() => {handleClick(); closeProfileBarHandler()}}/>
          </div>
        </div>
        <div>
          <div className={styles.mainBarItem}>
            <NavigationButton route={isMobile ? routeNames.SETTINGS : routeNames.PROFILE_SETTINGS} icon={<RiSettings4Line/>} activeIcon={<RiSettings4Fill/>}
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
