import { Link } from 'react-router-dom'
import { classNames } from '@helpers/classNames'
import styles from './UserAvatar.module.scss'

export const UserAvatar = ({name, image, status, handler, modifyClass, link}) => {
  return (
    <Link className={classNames({
      [styles.link]: true,
      [styles.small]: modifyClass === 'small',
      [styles.little]: modifyClass === 'little',
      [styles.medium]: modifyClass === 'medium',
      [styles.big]: modifyClass === 'big',
    })} to={link ? link : ''} onClick={handler ? handler : null}>
      <div className={styles.avatar}>
        {image
          ? <img className={styles.avatarImage} src={image} alt={name}/>
          : <span className={styles.avatarPlaceholder}>{name ? name.charAt(0) : null}</span>
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
