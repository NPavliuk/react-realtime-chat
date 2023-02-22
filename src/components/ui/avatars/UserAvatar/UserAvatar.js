import { Link } from 'react-router-dom'
import { classNames } from '@helpers/classNames'
import styles from './UserAvatar.module.scss'

export const UserAvatar = ({name, image, status, handler, classes, link}) => {
  return (
    <Link className={classNames({
      [styles.link]: true,
      [styles.small]: classes === 'small',
      [styles.little]: classes === 'little',
      [styles.medium]: classes === 'medium',
    })} to={link ? link : ''} onClick={handler ? handler : null}>
      <div className={styles.avatar}>
        {image
          ? <img className={styles.avatarImage} src={image} alt={name}/>
          : <span className={styles.avatarPlaceholder}>{name.charAt(0)}</span>
        }
        {status ? <span className={classNames({
          [styles.indicator]: true,
          [styles.online]: status === 'online',
          [styles.offline]: status === 'offline',
          [styles.out]: status === 'pending'
        })}></span> : null}
      </div>
    </Link>
  )
}
