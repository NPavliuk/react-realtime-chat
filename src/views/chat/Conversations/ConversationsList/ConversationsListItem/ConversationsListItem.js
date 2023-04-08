import styles from './ConversationsListItem.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { useSelector } from 'react-redux'
import { classNames } from '@helpers/classNames'
import { NavLink } from 'react-router-dom'


export const ConversationsListItem = ({conversation}) => {
	const userId = useSelector(state => state.auth.uid)
	const isDirectConversation = conversation.directConversation
	const conversationalists = conversation.conversationalists.filter(c => c.uid !== userId)

	return (
		isDirectConversation ?
			<NavLink to={`/conversations/${conversationalists[0].uid}`} className={({isActive}) => classNames({
				[styles.wrapper]: true,
				[styles.active]: isActive
			})}>
				<div className={styles.head}>
					<div className={styles.avatar}>
						<UserAvatar name={conversationalists[0].displayName} image={conversationalists[0].avatar}
												modifyClass={'small'} />
					</div>
					<div className={styles.info}>
						<h5 className={styles.name}>{conversationalists[0].displayName}</h5>
						<span className={styles.time}> - 14:20 PM</span>
					</div>
					<div className={styles.edit}>

					</div>
				</div>
				<div className={styles.message}>
					It is a long established fact that a reader will be distracted by the readable content of a page when looking
					at its layout.
				</div>
			</NavLink>
			: null
	)
}
