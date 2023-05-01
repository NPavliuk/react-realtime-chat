import styles from './MessageControlButton.module.scss'
import { classNames } from '@helpers/classNames'

export const MessageControlButton = ({handler, icon, modifyClass}) => {
	return (
		<button className={classNames({
			[styles.button]: true,
			[styles.like]: modifyClass === 'like',
			[styles.danger]: modifyClass === 'danger',
		})} onClick={handler ? handler : null}>
			{icon}
		</button>
	)
}
