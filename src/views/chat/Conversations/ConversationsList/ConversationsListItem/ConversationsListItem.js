import styles from './ConversationsListItem.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@helpers/classNames'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { removeConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { NavLink } from 'react-router-dom'

export const ConversationsListItem = ({conversation}) => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.uid)
	const isDirectConversation = conversation.directConversation
	const conversationalists = conversation.conversationalists.filter(c => c.uid !== userId)

	const removeConversationHandler = (e) => {
		e.preventDefault()

		const data = {
			userId: userId,
			interlocutorId: conversationalists[0].uid,
			conversationId: conversation.id.trim()
		}

		dispatch(removeConversationsStart(data))
	}

	return (
		isDirectConversation ?
			<NavLink to={`/conversations/${conversation.id}`} className={({isActive}) => classNames({
				[styles.wrapper]: true,
				[styles.active]: isActive
			})}>
				<div className={styles.head}>
					<div className={styles.avatar}>
						<UserAvatar name={conversationalists[0].displayName} image={conversationalists[0].avatar}
												modifyClass={'small'}/>
					</div>
					<div className={styles.info}>
						<h5 className={styles.name}>{conversationalists[0].displayName}</h5>
						<span className={styles.time}> - 14:20 PM</span>
					</div>
					{/* TODO: Add logic for dropdown. Move dropdown in new component */}
					<div className={styles.dropdown}>
						<button className={styles.dropdownButton} onClick={removeConversationHandler}>
							<HiOutlineDotsHorizontal/>
						</button>
					</div>
				</div>
				<div className={styles.message}>
					{
						conversation.lastMessage
							? conversation.lastMessage
							: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
					}

				</div>
			</NavLink>
			: null
	)
}
