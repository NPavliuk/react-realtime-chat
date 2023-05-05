import styles from './ProfileSettings.module.scss'
import { Settings } from '@views/settings/Settings/Settings'
import { ProfileSettingsForm } from '@views/settings/ProfileSettings/ProfileSettingsForm/ProfileSettingsForm'
import { checkIfMobile } from '@helpers/checkResolution'

export const ProfileSettings = () => {
	const isMobile = checkIfMobile()

	const outputHTML = () => {
		return (
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h1 className={styles.title}>Profile</h1>
					<p className={styles.description}>This information will be displayed publicly so be careful what you share</p>
				</div>

				<ProfileSettingsForm/>
			</div>
		)
	}

	return (
		isMobile ?
			<>
				{outputHTML()}
			</>
			:
			<Settings>
				{outputHTML()}
			</Settings>
	)
}
