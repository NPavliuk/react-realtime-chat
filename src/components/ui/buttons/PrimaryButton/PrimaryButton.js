import styles from './PrimaryButton.module.scss'
import { classNames } from '@helpers/classNames'
import { Link } from 'react-router-dom'

export const PrimaryButton = ({handler, title, modifyClass, link}) => {
  return (
    link ?
      <Link to={link} onClick={handler ? handler : null} className={classNames({
        [styles.button]: true,
        [styles.auto]: modifyClass === 'auto'
      })}>{title}</Link>
      :
      <button type="button" onClick={handler ? handler : null} className={classNames({
        [styles.button]: true,
        [styles.auto]: modifyClass === 'auto'
      })}>{title}</button>
  )
}
