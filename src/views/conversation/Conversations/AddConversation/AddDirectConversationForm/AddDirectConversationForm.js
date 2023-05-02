import styles from './AddDirectConversationForm.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { PrimaryButton } from '@components/ui/buttons'
import { SingleContactSelect } from '@components/ui/form/selects'
import { createDirectConversationStart } from '@store/reducers/conversationReducer/conversationActions'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { createSelectOptions } from '@helpers/createSelectOptions'
import { messages } from '@constants/validationMessages'

export const AddDirectConversationForm = ({closeHandler}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.data)
	const users = useSelector(state => state.users.users)
	const selectOptions = createSelectOptions(users, user.id)
	const {control, handleSubmit} = useForm({mode: 'onBlur'})

	useEffect(() => {
		dispatch(getUsersStart())
	}, [])

	const addConversationSubmitHandler = (data) => {
		data.userID = user.id
		data.navigate = navigate

		dispatch(createDirectConversationStart(data))
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
				<PrimaryButton title={'Cancel'} modifyClass={'cancel'} handler={closeHandler}/>
				<PrimaryButton title={'Create'} type={'submit'}/>
			</div>
		</form>
	)
}
