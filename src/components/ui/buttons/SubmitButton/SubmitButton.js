import styles from './SubmitButton.module.scss'

export const SubmitButton = ({title}) => {
  return (
    <button type="submit" className={styles.button}>{title}</button>
  )
}
