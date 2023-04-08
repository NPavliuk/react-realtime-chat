import styles from './NavigationSettingButton.module.scss'
import { NavLink } from 'react-router-dom'
import { classNames } from '@helpers/classNames'

export const NavigationSettingButton = ({route, icon, title, description}) => {
  return (
    <NavLink to={route} className={({isActive}) => classNames({
      [styles.button]: true,
      [styles.active]: isActive
    })}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.content}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.description}>{description}</p>
      </div>
    </NavLink>
  )
}
