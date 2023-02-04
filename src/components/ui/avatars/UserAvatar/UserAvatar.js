import { Link } from 'react-router-dom'
import { routeNames } from '@constants/routeNames'
import { classNames } from '@helpers/classNames'
import styles from './UserAvatar.module.scss'

export const UserAvatar = ({name, image, status, handler}) => {
  return (
    <Link className={styles.link} to={routeNames.USER} onClick={handler ? handler : null}>
      <div className={styles.avatar}>
        {image
          ? <img className={styles.avatarImage} src={image} alt={name}/>
          : <span className={styles.avatarPlaceholder}>{name.charAt(0)}</span>
        }
        <span className={classNames({
          [styles.indicator]: true,
          [styles.online]: status === 'online',
          [styles.offline]: status === 'offline',
          [styles.out]: status === 'pending'
        })}></span>
      </div>
    </Link>
  )
}
