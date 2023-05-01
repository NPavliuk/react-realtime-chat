import { Link } from 'react-router-dom'
import { classNames } from '@helpers/classNames'
import styles from './PrimaryButton.module.scss'

export const PrimaryButton = ({handler, title, modifyClass, link, type}) => {
  return (
    link ?
      <Link to={link} onClick={handler ? handler : null} className={classNames({
        [styles.button]: true,
        [styles.auto]: modifyClass === 'auto',
				[styles.cancel]: modifyClass === 'cancel'
      })}>{title}</Link>
      :
      <button type={type ? type : 'button'} onClick={handler ? handler : null} className={classNames({
        [styles.button]: true,
				[modifyClass]: modifyClass === 'auto',
				[styles.cancel]: modifyClass === 'cancel'
      })}>{title}</button>
  )
}
