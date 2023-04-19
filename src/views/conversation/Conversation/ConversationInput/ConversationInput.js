import styles from './ConversationInput.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationMessageStart } from '@store/reducers/conversationReducer/conversationActions'
import { getConversationalistsIDs } from '@helpers/getConversationalistsIDs'

export const ConversationInput = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state =>  state.auth.id)
	const conversationID = useSelector(state => state.conversation.id)
	const conversations = useSelector(state => state.conversations.conversations)
	const {handleSubmit, register} = useForm()

	const onSubmit = (data) => {
		data.userID = userID
		data.conversationID = conversationID
		data.conversationalists = getConversationalistsIDs(conversations, conversationID)

		dispatch(setConversationMessageStart(data))
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<textarea name="messageText"
								id="messageText"
								cols="30"
								rows="5"
								placeholder={'Enter you message here'}
								{...register('messageText', {})}>
			</textarea>
			<button type={'submit'}>send message</button>
		</form>
	)
}
