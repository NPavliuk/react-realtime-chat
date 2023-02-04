import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { NavBarLogoutButton } from '@components/sidebars/NavBar/NavBarLogoutButton/NavBarLogoutButton'
import { NavBarButton } from '@components/sidebars/NavBar/NavBarButton/NavBarButton'
import { UserAvatar } from '@components/ui/avatars'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { RiDiscussLine, RiDiscussFill, RiUserLine, RiUserFill, RiSettings4Line, RiSettings4Fill } from 'react-icons/ri'
import { classNames } from '@helpers/classNames'
import { routeNames } from '@constants/routeNames'
import styles from './NavBar.module.scss'

export const NavBar = () => {
  const navBarRef = useRef()
  const user = useSelector(state => state.user.data)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && navBarRef.current && !navBarRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])

  const handleClick = () => {
    setOpen(!open)
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
          <UserAvatar name={user.displayName} image={user.avatar} status={'online'} handler={handleClick}/>
        </div>
        <div className={styles.mainBarNav}>
          <div className={styles.mainBarItem}>
            <NavBarButton route={routeNames.DIALOGS} icon={<RiDiscussLine/>} activeIcon={<RiDiscussFill/>}
                          indicator={true} handler={handleClick}/>
          </div>
          <div className={styles.mainBarItem}>
            <NavBarButton route={routeNames.USERS} icon={<RiUserLine/>} activeIcon={<RiUserFill/>} indicator={false}
                          handler={handleClick}/>
          </div>
        </div>
        <div>
          <div className={styles.mainBarItem}>
            <NavBarButton route={routeNames.SETTINGS} icon={<RiSettings4Line/>} activeIcon={<RiSettings4Fill/>}
                          indicator={false} handler={handleClick}/>
          </div>
          <div className={styles.mainBarItem}>
            <NavBarLogoutButton/>
          </div>
        </div>
      </div>
    </aside>
  )
}
