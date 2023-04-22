import styles from './ConversationHead.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'

export const ConversationHead = ({conversationID}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversations = useSelector(state => state.conversations.conversations)

	const getInterlocutorData = () => {
		let data
		const conversation = conversations.filter(conversation => conversation.id === conversationID)
		if (conversation.length > 0) {
			conversation[0].conversationalists.map(i => i.id !== userID ? data = i : null)
		}
		return data
	}

	const interlocutor = getInterlocutorData()

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(interlocutor.id))
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
