import styles from './MessageSendButton.module.scss'
import { RiSendPlane2Fill } from 'react-icons/ri'

export const MessageSendButton = ({buttonRef}) => {
	return (
		<button type={'submit'} className={styles.button} ref={buttonRef ? buttonRef : ''}>
			<RiSendPlane2Fill/>
		</button>
	)
}
