import styles from './MessageRemoveButton.module.scss'
import { classNames } from '@helpers/classNames'

export const MessageRemoveButton = ({handler, icon}) => {
	return (
		<button className={classNames({
			[styles.button]: true
		})} onClick={handler ? handler : null}>
			{icon}
		</button>
	)
}
