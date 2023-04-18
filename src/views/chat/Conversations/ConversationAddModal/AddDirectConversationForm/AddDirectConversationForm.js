import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { SingleContactSelect } from '@components/ui/form/selects'
import { getContactsStart } from '@store/reducers/contactsReducer/contactsActions'
import { createDirectConversationStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { messages } from '@constants/validationMessages'
import styles from './AddDirectConversationForm.module.scss'


export const AddDirectConversationForm = ({closeHandler}) => {
	const selectOptions = []
	const userID = useSelector(state => state.auth.id)
	const contacts = useSelector(state => state.contacts.contacts)
	const {control, handleSubmit} = useForm({mode: 'onBlur'})

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getContactsStart(userID))
	}, [])

	const addConversationSubmitHandler = (data) => {
		const allData = {
			...data,
			userID: userID
		}

		dispatch(createDirectConversationStart(allData))
	}

	contacts.map(contact => {
		const selectOption = {
			label: contact.name,
			value: contact.id,
			contact: contact
		}

		selectOptions.push(selectOption)
	})

	return (
		<form className={styles.form} onSubmit={handleSubmit(addConversationSubmitHandler)}>
			<div className={styles.select}>
				<Controller render={({field: {onChange, value}, fieldState: {error}}) => (
					<SingleContactSelect options={selectOptions}
															 handleChange={onChange}
															 value={value}
															 error={error}/>)}
										name="interlocutorID"
										control={control}
										rules={{required: messages.requiredField}}
				/>
			</div>

			<div className={styles.controls}>
				<CancelButton title={'Cancel'} handler={closeHandler}/>
				<SubmitButton title={'Create'}/>
			</div>
		</form>
	)
}
