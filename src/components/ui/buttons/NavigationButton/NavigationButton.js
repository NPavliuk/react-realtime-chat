import styles from './NavigationButton.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { checkLocationParent } from '@helpers/checkLocation'
import { classNames } from '@helpers/classNames'

export const NavigationButton = ({icon, activeIcon, route, indicator, handler}) => {
  const location = useLocation()
  const isCurrent = checkLocationParent(location.pathname, route)

  return (
    <NavLink to={route} className={({isActive}) => classNames({
      [styles.button]: true,
      [styles.active]: isActive
    })} onClick={handler ? handler : null}>
      {isCurrent ? activeIcon : icon}
      {indicator ? <span className={styles.indicator}></span> : null}
    </NavLink>
  )
}
