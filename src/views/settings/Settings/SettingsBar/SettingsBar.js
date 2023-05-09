import styles from './SettingsBar.module.scss'
import { NavigationSettingButton } from '@components/ui/buttons'
import { RiUserSettingsLine } from 'react-icons/ri'
import { VscKey } from 'react-icons/vsc'
import { routeNames } from '@constants/routeNames'

export const SettingsBar = () => {
  return (
    <aside className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.description}>Here you can customize and manage preferences and account information</p>
      </div>

      <nav className={styles.nav}>
        <NavigationSettingButton route={routeNames.PROFILE_SETTINGS}
																 title={'Profile'}
                                 description={'Here you can manage and customize your personal info information'}
                                 icon={<RiUserSettingsLine/>}
				/>
        <NavigationSettingButton route={routeNames.SECURITY_SETTINGS}
																 title={'Security'}
                                 description={'Here you can update your login credentials such as password and email'}
                                 icon={<VscKey/>}
				/>
      </nav>
    </aside>
  )
}
