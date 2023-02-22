import styles from './PrimaryButton.module.scss'

export const PrimaryButton = ({handler, title}) => {
  return(
    <button type="button" onClick={handler ? handler : null} className={styles.button}>{title}</button>
  )
}
