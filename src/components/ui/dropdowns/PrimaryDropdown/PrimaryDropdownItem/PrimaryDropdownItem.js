import styles from './PrimaryDropdownItem.module.scss'
import { classNames } from '@helpers/classNames'

export const PrimaryDropdownItem = ({icon, title, handler, modifyClass}) => {
	return (
		<li className={classNames({
			[styles.wrapper]: true,
			[styles.danger]: modifyClass === 'danger'
		})} onClick={handler ? handler : null}>
			{icon ? icon : null}
			<span className={styles.title}>{title}</span>
		</li>
	)
}
