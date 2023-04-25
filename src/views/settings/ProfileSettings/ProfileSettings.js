import { Settings } from '@views/settings/Settings/Settings'
import { ProfileSettingsForm } from './ProfileSettingsForm/ProfileSettingsForm'
import styles from './ProfileSettings.module.scss'
import { checkIfMobile } from '@helpers/checkResolution'

export const ProfileSettings = () => {
  const isMobile = checkIfMobile()

  return (
    isMobile ?
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.description}>This information will be displayed publicly so be careful what you share</p>
        </div>

        <ProfileSettingsForm/>
      </div>
      :
      <Settings>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Profile</h1>
            <p className={styles.description}>This information will be displayed publicly so be careful what you
              share</p>
          </div>

          <ProfileSettingsForm/>
        </div>
      </Settings>
  )
}
