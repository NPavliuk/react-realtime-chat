import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { SingleContactSelect } from '@components/ui/form/selects'
import { createDirectConversationStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { messages } from '@constants/validationMessages'
import styles from './AddDirectConversationForm.module.scss'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { createSelectOptions } from '@helpers/createSelectOptions'


export const AddDirectConversationForm = ({closeHandler}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const users = useSelector(state => state.users.users)
	const {control, handleSubmit} = useForm({mode: 'onBlur'})
	const selectOptions = createSelectOptions(users, userID)

	useEffect(() => {
		dispatch(getUsersStart())
	}, [])

	const addConversationSubmitHandler = (data) => {
		const allData = {
			...data,
			userID: userID
		}

		dispatch(createDirectConversationStart(allData))
		// 	Redirect to conversation after it creating
	}

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
