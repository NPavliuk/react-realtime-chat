import styles from './MessageControlButton.module.scss'
import { classNames } from '@helpers/classNames'

export const MessageControlButton = ({handler, icon, modifyClass}) => {
	return (
		<button className={classNames({
			[styles.button]: true,
			[styles.danger]: modifyClass === 'danger',
			[styles.like]: modifyClass === 'like',
		})} onClick={handler ? handler : null}>
			{icon}
		</button>
	)
}
