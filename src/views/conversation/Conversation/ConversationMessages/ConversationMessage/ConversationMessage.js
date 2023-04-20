import styles from './ConversationMessage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { removeConversationMessageStart } from '@store/reducers/conversationReducer/conversationActions'
import { getNewLastMessage, isLastMessage } from '@helpers/lastMessage'
import Moment from 'react-moment'
import { classNames } from '@helpers/classNames'
import { UserAvatar } from '@components/ui/avatars'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { MessageRemoveButton } from '@components/ui/buttons/MessageRemoveButton/MessageRemoveButton'

export const ConversationMessage = ({message, messages, conversationID}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversations = useSelector(state => state.conversations.conversations)

	const removeMessageHandler = () => {
		const data = {
			message: message,
			conversationID: conversationID,
			lastMessage: isLastMessage(messages, message) ? getNewLastMessage(messages, message) : null
		}

		dispatch(removeConversationMessageStart(data))
	}

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(getProfileInfoStart(message.senderId))
	}

	const getInterlocutorData = () => {
		let data
		const conversation = conversations.filter(conversation => conversation.id === conversationID)
		if (conversation.length > 0) {
			conversation[0].conversationalists.map(i => i.id === message.senderId ? data = i : null)
		}
		return data
	}

	const interlocutor = getInterlocutorData()

	return (
		<div className={styles.wrapper}>
			<div className={classNames({
				[styles.message]: true,
				[styles.incoming]: userID !== message.senderId
			})}>
				<div className={styles.messageInner}>
					<span className={styles.messageText}>{message.text}</span>
					<span className={styles.messageTime}>
						<Moment format={'hh:mm A'}>{message.date.toDate()}</Moment>
					</span>
				</div>
				<UserAvatar name={interlocutor ? interlocutor.name : ''}
										image={interlocutor ? interlocutor.avatar : ''}
										handler={openProfileBarHandler}/>
			</div>

			<div className={styles.controls}>
				<MessageRemoveButton icon={<RiDeleteBin7Line/>} handler={removeMessageHandler} modifyClass={'remove'}/>
			</div>
		</div>
	)
}
