import styles from './CancelButton.module.scss'

export const CancelButton = ({handler, title}) => {
  return(
    <button type="button" onClick={handler ? handler : null} className={styles.button}>{title}</button>
  )
}
