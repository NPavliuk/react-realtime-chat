import styles from './ConversationMessage.module.scss'
import Moment from 'react-moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { openEditMessageMode, likeMessageStart, removeMessageStart, setReadedMessageStart, unlikeMessageStart } from '@store/reducers/messagesReducer/messagesActions'
import { UserAvatar } from '@components/ui/avatars'
import { MessageControlButton } from '@components/ui/buttons/MessageControlButton/MessageControlButton'
import { RiDeleteBin7Line, RiPencilLine, RiHeartLine, RiHeartFill } from 'react-icons/ri'
import { getNewLastMessage, isLastMessage, isUnreadMessage } from '@helpers/messages'
import { classNames } from '@helpers/classNames'
import { checkIsLiked } from '@helpers/checkIsLiked'

export const ConversationMessage = ({message, conversation, messages}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const isLiked = checkIsLiked(message.likes, userID)

	useEffect(() => {
		const isUnread = isUnreadMessage(message, userID)

		if (isUnread) {
			const data = {
				userID: userID,
				message: message,
				conversationID: conversation.id,
				lastMessage: conversation.data.lastMessage
			}

			dispatch(setReadedMessageStart(data))
		}
	}, [message])

	const removeMessageHandler = () => {
		const data = {
			message: message,
			conversationID: conversation.id,
			lastMessage: isLastMessage(messages, message) ? getNewLastMessage(messages, message) : null
		}

		dispatch(removeMessageStart(data))
	}

	const editMessageHandler = () => {
		dispatch(openEditMessageMode(message))
	}

	const likeMessageHandler = () => {
		const data = {
			userID: userID,
			conversationID: conversation.id,
			message: message
		}

		dispatch(likeMessageStart(data))
	}

	const unlikeMessageHandler = () => {
		const data = {
			userID: userID,
			conversationID: conversation.id,
			message: message
		}

		dispatch(unlikeMessageStart(data))
	}

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(message.senderId))
	}

	let interlocutor
	if (conversation.data.conversationalists) {
		conversation.data.conversationalists.map(i => i.id === message.senderId ? interlocutor = i : null)
	}

	return (
		<div className={classNames({
			[styles.message]: true, [styles.incoming]: userID !== message.senderId
		})}>
			<div className={styles.messageInner}>
				<div className={styles.messageBlock}>
					<div className={styles.messageText} dangerouslySetInnerHTML={{__html: message.text}}></div>
					<div className={styles.controls}>
						<MessageControlButton icon={isLiked ? <RiHeartFill/> : <RiHeartLine/>} handler={isLiked ? unlikeMessageHandler : likeMessageHandler} modifyClass={isLiked ? 'like' : null}/>
						{
							message.senderId === userID
								? <MessageControlButton icon={<RiPencilLine/>} handler={editMessageHandler}/>
								: null
						}
						<MessageControlButton icon={<RiDeleteBin7Line/>} handler={removeMessageHandler} modifyClass={'danger'}/>
					</div>
				</div>
				<div className={styles.messageInfo}>
					<span className={styles.messageTime}>
						<Moment format={'hh:mm A'}>{message.date.toDate()}</Moment>
					</span>
					{
						message.edited
							? <span className={styles.messageEdited}>edited</span>
							: null
					}
					{
						message.likes.length > 0
							? <span className={styles.messageLikes}>
								<RiHeartFill/> {message.likes.length}
							</span>
							: null
					}
				</div>
			</div>
			<UserAvatar name={interlocutor ? interlocutor.name : ''} image={interlocutor ? interlocutor.avatar : ''} handler={openProfileBarHandler}/>
		</div>
	)
}
