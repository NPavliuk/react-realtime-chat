import { NavLink, useLocation } from 'react-router-dom'
import { classNames } from '@helpers/classNames'
import styles from './NavigationButton.module.scss'

export const NavigationButton = ({icon, activeIcon, route, indicator, handler}) => {
  const location = useLocation()

  return (
    <NavLink to={route} className={({ isActive }) => classNames({
      [styles.button]: true,
      [styles.active]: isActive,
    })} onClick={handler ? handler : null}>
      {location.pathname === route ? activeIcon : icon}
      {indicator ?  <span className={styles.indicator}></span> : null}
    </NavLink>
  )
}
