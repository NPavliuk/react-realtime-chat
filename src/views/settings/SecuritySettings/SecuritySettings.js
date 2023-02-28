import styles from './SecuritySettings.module.scss'
import { Settings } from '@views/settings/Settings/Settings'
import { checkIfMobile } from '@helpers/checkMobile'

export const SecuritySettings = () => {
  const isMobile = checkIfMobile()

  return (
    isMobile ?
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Security</h1>
          <p className={styles.description}>This is private information and will be not displayed publicly</p>
        </div>
      </div>
      :
      <Settings>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Security</h1>
            <p className={styles.description}>This is private information and will be not displayed publicly</p>
          </div>
        </div>
      </Settings>
  )
}
