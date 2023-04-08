import styles from './ConversationsListEmptyState.module.scss'

export const ConversationsListEmptyState = ({text}) => {
	return (
		<div className={styles.block}>
			<p className={styles.title}>You don't have any {text} yet. Create conversation using button below.</p>
		</div>
	)
}
