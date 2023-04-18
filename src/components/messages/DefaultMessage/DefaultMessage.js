import styles from './DefaultMessage.module.scss'
import { useDispatch } from 'react-redux'
import { removeConversationMessageStart } from '@store/reducers/conversationReducer/conversationActions'

export const DefaultMessage = ({message, conversationID}) => {
	const dispatch = useDispatch()

	const removeMessageHandler = () => {
		const data = {
			message: message,
			conversationID: conversationID
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
