import styles from './DefaultMessage.module.scss'
import { useDispatch } from 'react-redux'
import { removeConversationMessageStart } from '@store/reducers/conversationReducer/conversationActions'
import { getNewLastMessage, isLastMessage } from '@helpers/lastMessage'

export const DefaultMessage = ({message, messages, conversationID}) => {
	const dispatch = useDispatch()

	const removeMessageHandler = () => {
		const data = {
			message: message,
			conversationID: conversationID,
			lastMessage: isLastMessage(messages, message) ? getNewLastMessage(messages, message) : null
		}

		dispatch(removeConversationMessageStart(data))
	}

	return (
		<div>
			<p>{message.text}</p>
			<button onClick={removeMessageHandler}>remove</button>
		</div>
	)
}
