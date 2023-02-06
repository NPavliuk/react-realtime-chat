import { classNames } from '@helpers/classNames'
import styles from './MemberAvatar.module.scss'

export const MemberAvatar = ({image, name, classes, status, hiddenUsers, active}) => {
  return (
    <div className={classNames({
      [styles.link]: true,
      [styles.small]: classes === 'small',
      [styles.active]: active,
      [styles.hiddenUsers]: hiddenUsers
    })}>
      <div className={styles.avatar}>
        {image
          ? <img className={styles.avatarImage} src={image} alt={name}/>
          : <span className={styles.avatarPlaceholder}>{hiddenUsers ? name : name.charAt(0)}</span>
        }
        {status ? <span className={classNames({
          [styles.indicator]: true,
          [styles.online]: status === 'online',
          [styles.offline]: status === 'offline',
          [styles.out]: status === 'pending'
        })}></span> : null}
      </div>
    </div>
  )
}
