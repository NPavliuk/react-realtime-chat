import styles from './CloseButton.module.scss'
import { RiCloseFill } from 'react-icons/ri'

export const CloseButton = ({handler}) => {
	return (
		<button className={styles.button} onClick={handler ? handler : null}>
			<RiCloseFill/>
		</button>
	)
}
