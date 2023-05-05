import styles from './UserAvatar.module.scss'
import { classNames } from '@helpers/classNames'

export const UserAvatar = ({name, image, status, handler, modifyClass}) => {
  return (
    <div className={classNames({
      [styles.wrapper]: true,
      [styles.pointer]: handler,
      [styles.small]: modifyClass === 'small',
      [styles.little]: modifyClass === 'little',
      [styles.medium]: modifyClass === 'medium',
      [styles.big]: modifyClass === 'big',
    })} onClick={handler ? handler : null}>
      <div className={styles.avatar}>
        {image
          ? <img className={styles.image} src={image} alt={name}/>
          : <span className={styles.placeholder}>{name ? name.charAt(0) : null}</span>
        }
        {status ? <span className={classNames({
          [styles.indicator]: true,
          [styles.online]: status,
        })}></span> : null}
      </div>
    </div>
  )
}
