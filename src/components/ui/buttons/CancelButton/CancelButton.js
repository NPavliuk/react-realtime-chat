import styles from './CancelButton.module.scss'
import { classNames } from '@helpers/classNames'

export const CancelButton = ({handler, title, modifyClass}) => {
  return(
    <button type="button" onClick={handler ? handler : null} className={classNames({
      [styles.button]: true,
      [styles.auto]: modifyClass === 'auto'
    })}>{title}</button>
  )
}
