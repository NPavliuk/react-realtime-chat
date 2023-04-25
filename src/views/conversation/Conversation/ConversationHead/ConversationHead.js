import styles from './ConversationHead.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'

export const ConversationHead = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversation = useSelector(state => state.conversation)

	let interlocutor
	if (conversation.data.conversationalists) {
		conversation.data.conversationalists.map(i => i.id !== userID ? interlocutor = i : null)
	}

	const openProfileBarHandler = () => {
		if(interlocutor) {
			dispatch(openProfileBar())
			dispatch(getProfileInfoStart(interlocutor.id))
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.user}>
				<UserAvatar name={interlocutor ? interlocutor.name : ''}
										image={interlocutor ? interlocutor.avatar : ''}
										handler={openProfileBarHandler}/>
				<div className={styles.userDetails}>
					<h3 className={styles.userName}>{interlocutor ? interlocutor.name : ''}</h3>
					<p className={styles.userPosition}>Web dev</p>
				</div>
			</div>
		</div>
	)
}
