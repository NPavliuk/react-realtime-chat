import { NavLink, useLocation } from 'react-router-dom'
import { classNames } from '@helpers/classNames'
import { checkLocationParent } from '@helpers/checkLocation'
import styles from './NavigationButton.module.scss'

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
