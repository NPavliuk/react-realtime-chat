import styles from './TypeButton.module.scss'

export const TypeButton = ({handler, icon, title, description}) => {
  return (
    <button className={styles.button} onClick={handler ? handler : null}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.content}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.description}>{description}</p>
      </div>
    </button>
  )
}
