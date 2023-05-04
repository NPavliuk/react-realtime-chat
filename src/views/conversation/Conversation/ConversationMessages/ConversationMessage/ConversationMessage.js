import styles from './ConversationMessage.module.scss'
import Moment from 'react-moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	ConversationMessageReply
} from '@views/conversation/Conversation/ConversationMessages/ConversationMessage/ConversationMessageReply/ConversationMessageReply'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { setConversationInput } from '@store/reducers/conversationReducer/conversationActions'
import {
	openEditMessageMode,
	likeMessageStart,
	removeMessageStart,
	setReadedMessageStart,
	unlikeMessageStart,
	openReplyMessageMode
} from '@store/reducers/messagesReducer/messagesActions'
import { MessageControlButton } from '@components/ui/buttons/MessageControlButton/MessageControlButton'
import { UserAvatar } from '@components/ui/avatars'
import { RiDeleteBin7Line, RiPencilLine, RiHeartLine, RiHeartFill, RiReplyLine } from 'react-icons/ri'
import { getNewLastMessage, isLastMessage, isUnreadMessage } from '@helpers/messages'
import { classNames } from '@helpers/classNames'
import { checkLiked } from '@helpers/checkLiked'
import { getInterlocutorData } from '@helpers/getInterlocutorData'
import { checkUserStatus } from '@helpers/checkUserStatus'

export const ConversationMessage = ({message, conversation, messages}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const onlineUsers = useSelector(state => state.users.onlineUsers)
	const isLiked = checkLiked(message.likes, userID)
	let interlocutor = getInterlocutorData(conversation, message)

	let userStatus
	if (interlocutor) {
		userStatus = checkUserStatus(interlocutor.id, onlineUsers)
	}

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
		dispatch(setConversationInput(message.text))
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

	const replyMessageHandler = () => {
		dispatch(openReplyMessageMode(message))
	}

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(message.senderId))
	}

	return (
		<div className={classNames({
			[styles.message]: true,
			[styles.incoming]: userID !== message.senderId
		})}>
			<div className={styles.messageInner}>
				<div className={styles.messageBlock}>
					<div className={styles.messageContent}>
						{
							message.replyMessage
								? <ConversationMessageReply conversation={conversation} message={message}
																						modifyClass={userID !== message.senderId ? 'incoming' : null}/>
								: null
						}
						<div dangerouslySetInnerHTML={{__html: message.text}}></div>
					</div>
					<div className={styles.controls}>
						<MessageControlButton icon={isLiked ? <RiHeartFill/> : <RiHeartLine/>}
																	handler={isLiked ? unlikeMessageHandler : likeMessageHandler}
																	modifyClass={isLiked ? 'like' : null}/>
						<MessageControlButton icon={<RiReplyLine/>} handler={replyMessageHandler}/>
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
			<UserAvatar name={interlocutor ? interlocutor.name : ''} status={userStatus}
									image={interlocutor ? interlocutor.avatar : ''}
									handler={openProfileBarHandler}/>
		</div>
	)
}
