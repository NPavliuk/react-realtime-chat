import styles from './ConversationMessage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
	openEditConversationMessageMode,
	removeConversationMessageStart,
	setReadedConversationMessageStart
} from '@store/reducers/conversationReducer/conversationActions'
import { getNewLastMessage, isLastMessage, isUnreadMessage } from '@helpers/messages'
import Moment from 'react-moment'
import { classNames } from '@helpers/classNames'
import { UserAvatar } from '@components/ui/avatars'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { RiDeleteBin7Line, RiPencilLine } from 'react-icons/ri'
import { MessageControlButton } from '@components/ui/buttons/MessageControlButton/MessageControlButton'
import { useEffect } from 'react'

export const ConversationMessage = ({message, conversation}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)

	useEffect(() => {
		const isUnread = isUnreadMessage(message, userID)

		if (isUnread) {
			const data = {
				userID: userID,
				message: message,
				conversationID: conversation.id
			}

			dispatch(setReadedConversationMessageStart(data))
		}
	}, [message])

	useEffect(() => {
		const isUnread = isUnreadMessage(message, userID)

		if (isUnread) {
			const data = {
				userID: userID,
				message: message,
				conversationID: conversation.id,
				lastMessage: conversation.data.lastMessage
			}

			dispatch(setReadedConversationMessageStart(data))
		}
	}, [message])

	const removeMessageHandler = () => {
		const data = {
			message: message,
			conversationID: conversation.id,
			lastMessage: isLastMessage(conversation.messages, message) ? getNewLastMessage(conversation.messages, message) : null
		}

		dispatch(removeConversationMessageStart(data))
	}

	const editMessageHandler = () => {
		dispatch(openEditConversationMessageMode(message))
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
		<div className={styles.wrapper}>
			<div className={classNames({
				[styles.message]: true,
				[styles.incoming]: userID !== message.senderId
			})}>
				<div className={styles.messageInner}>
					<div className={styles.messageText} dangerouslySetInnerHTML={{__html: message.text}}></div>
					<span className={styles.messageTime}>
						<Moment format={'hh:mm A'}>{message.date.toDate()}</Moment>
					</span>
				</div>
				<UserAvatar name={interlocutor ? interlocutor.name : ''}
										image={interlocutor ? interlocutor.avatar : ''}
										handler={openProfileBarHandler}/>
			</div>

			<div className={styles.controls}>
				{
					message.senderId === userID
						? <MessageControlButton icon={<RiPencilLine />} handler={editMessageHandler} />
						: null
				}
				<MessageControlButton icon={<RiDeleteBin7Line />} handler={removeMessageHandler} modifyClass={'danger'} />
			</div>
		</div>
	)
}
