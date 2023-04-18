import styles from './ConversationInput.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationMessageStart } from '@store/reducers/conversationReducer/conversationActions'

export const ConversationInput = () => {
	const userID = useSelector(state =>  state.auth.id)
	const conversationID = useSelector(state => state.conversation.id)
	const {handleSubmit, register} = useForm()
	const dispatch = useDispatch()

	const onSubmit = (data) => {
		data.userID = userID
		data.conversationID = conversationID

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
