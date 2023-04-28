import styles from './AddDirectConversationForm.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { SingleContactSelect } from '@components/ui/form/selects'
import { createDirectConversationStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { createSelectOptions } from '@helpers/createSelectOptions'
import { messages } from '@constants/validationMessages'
import { useNavigate } from 'react-router-dom'

export const AddDirectConversationForm = ({closeHandler}) => {
	const user = useSelector(state => state.user.data)
	const users = useSelector(state => state.users.users)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const selectOptions = createSelectOptions(users, user.id)
	const {control, handleSubmit} = useForm({mode: 'onBlur'})

	useEffect(() => {
		dispatch(getUsersStart())
	}, [])

	const addConversationSubmitHandler = (data) => {
		const allData = {
			...data,
			userID: user.id,
			navigate: navigate
		}

		dispatch(createDirectConversationStart(allData))
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
