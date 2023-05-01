import styles from './ConversationDate.module.scss'
import moment from 'moment'

export const ConversationDate = ({date}) => {
	const today = moment().format('YYYY-MM-DD')
	const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD')

	return (
		<div className={styles.wrapper}>
			<span className={styles.title}>
				{
					date === today
						? 'Today'
						: date === yesterday
							? 'Yesterday'
							: moment(date).format('dddd, MMMM Do')
				}
			</span>
			<span className={styles.divider}></span>
		</div>
	)
}
