import styles from './SecuritySettings.module.scss'
import { Settings } from '@views/settings/Settings/Settings'
import { SecuritySettingsForm } from '@views/settings/SecuritySettings/SecuritySettingsForm/SecuritySettingsForm'
import { checkIfMobile } from '@helpers/checkResolution'

export const SecuritySettings = () => {
	const isMobile = checkIfMobile()

	const outputHTML = () => {
		return (
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h1 className={styles.title}>Security</h1>
					<p className={styles.description}>This information will be displayed publicly so be careful what you share</p>
				</div>

				<SecuritySettingsForm/>
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
