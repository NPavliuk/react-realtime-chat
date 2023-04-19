import styles from './ConversationsListItem.module.scss'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { UserAvatar } from '@components/ui/avatars'
import { removeConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { classNames } from '@helpers/classNames'
import { routeNames } from '@constants/routeNames'

export const ConversationsListItem = ({conversation}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const isDirectConversation = conversation.directConversation
	const conversationalists = conversation.conversationalists.filter(c => c.id !== userID)

	const removeConversationHandler = (e) => {
		e.preventDefault()

		const data = {
			userID: userID,
			interlocutorID: conversationalists[0].id,
			conversationID: conversation.id.trim()
		}

		dispatch(removeConversationsStart(data))
	}

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(conversationalists[0].id))
	}

	return (
		isDirectConversation ?
			<NavLink to={`${routeNames.CONVERSATIONS}/${conversation.id}`} className={({isActive}) => classNames({
				[styles.wrapper]: true,
				[styles.active]: isActive
			})}>
				<div className={styles.head}>
					<div className={styles.avatar}>
						<UserAvatar name={conversationalists[0].name} image={conversationalists[0].avatar}
												modifyClass={'small'} handler={openProfileBarHandler}/>
					</div>
					<div className={styles.info}>
						<h5 className={styles.name}>{conversationalists[0].name}</h5>
						{
							conversation.lastMessage
								? <span className={styles.time}> - <Moment format={"hh:mm A"}>{conversation.lastMessage.date.toDate()}</Moment></span>
								: <span className={styles.time}> - <Moment format={"hh:mm A"}>{conversation.conversationStart.toDate()}</Moment></span>
						}

					</div>
					{/* TODO: Add logic for dropdown. Move dropdown in new component */}
					<div className={styles.dropdown}>
						<button className={styles.dropdownButton} onClick={removeConversationHandler}>
							<HiOutlineDotsHorizontal/>
						</button>
					</div>
				</div>
				<div className={styles.message}>
					{/* TODO: Need change last message for previous if user remove last message*/}
					{
						conversation.lastMessage
							? conversation.lastMessage.text
							: `Start a conversation with ${conversationalists[0].name}`
					}
				</div>
			</NavLink>
			: null
	)
}
