import styles from './ConversationsListItem.module.scss'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatar } from '@components/ui/avatars'
import { classNames } from '@helpers/classNames'
import { routeNames } from '@constants/routeNames'
import { isUnreadMessage } from '@helpers/messages'
import { FiUsers } from 'react-icons/fi'
import { closeConversationBar } from '@store/reducers/conversationReducer/conversationActions'
import { checkUserStatus } from '@helpers/checkUserStatus'

export const ConversationsListItem = ({conversation}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const onlineUsers = useSelector(state => state.users.onlineUsers)
	const conversationalists = conversation.conversationalists.filter(c => c.id !== userID)
	const isUnread = isUnreadMessage(conversation.lastMessage, userID)

	let userStatus
	if (conversationalists[0]) {
		userStatus = checkUserStatus(conversationalists[0].id, onlineUsers)
	}


	const closeConversationBarHandler = () => {
		dispatch(closeConversationBar())
	}

	return (
		conversation.directConversation ?
			<NavLink to={`${routeNames.CONVERSATIONS}/${conversation.id}`} onClick={closeConversationBarHandler}
							 className={({isActive}) => classNames({
								 [styles.wrapper]: true,
								 [styles.active]: isActive
							 })}>
				<div className={styles.head}>
					<UserAvatar name={conversationalists[0].name} image={conversationalists[0].avatar} status={userStatus}
											modifyClass={'small'}/>
					<div className={styles.info}>
						<h5 className={styles.name}>{conversationalists[0].name}</h5>
						{
							conversation.lastMessage
								? <span className={styles.time}> - <Moment
									format={'hh:mm A'}>{conversation.lastMessage.date.toDate()}</Moment></span>
								: <span className={styles.time}> - <Moment
									format={'hh:mm A'}>{conversation.conversationStart.toDate()}</Moment></span>
						}
					</div>
					{
						conversation.lastMessage && isUnread ?
							<div className={styles.unread}>
								<span className={styles.indicator}></span>
							</div>
							: null
					}
				</div>
				<div className={styles.message} dangerouslySetInnerHTML={
					{__html: conversation.lastMessage ? conversation.lastMessage.text : `Start a conversation with ${conversationalists[0].name}`}
				}></div>
			</NavLink>
			:
			<NavLink to={`${routeNames.CONVERSATIONS}/${conversation.id}`} className={({isActive}) => classNames({
				[styles.wrapper]: true,
				[styles.active]: isActive
			})}>
				<div className={styles.head}>
					<UserAvatar name={conversation.name} image={conversation.avatar ? conversation.avatar : null}
											modifyClass={'small'}/>
					<div className={styles.info}>
						<h5 className={styles.name}>{conversation.name}</h5>
						{
							conversation.lastMessage
								? <span className={styles.time}> - <Moment
									format={'hh:mm A'}>{conversation.lastMessage.date.toDate()}</Moment></span>
								: <span className={styles.time}> - <Moment
									format={'hh:mm A'}>{conversation.conversationStart.toDate()}</Moment></span>
						}
					</div>
					{
						conversation.lastMessage && isUnread ?
							<div className={styles.unread}>
								<span className={styles.indicator}></span>
							</div>
							: null
					}
				</div>
				<div className={styles.message} dangerouslySetInnerHTML={
					{__html: conversation.lastMessage ? conversation.lastMessage.text : `Start a conversation in ${conversation.name}`}
				}></div>
				<div className={styles.conversationalists}>
					<FiUsers/>{conversation.conversationalists.length}
				</div>
			</NavLink>
	)
}
