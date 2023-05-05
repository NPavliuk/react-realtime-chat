import styles from './AddInterlocutor.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { SingleContactSelect } from '@components/ui/form/selects'
import { PrimaryButton } from '@components/ui/buttons'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { addInterlocutorStart } from '@store/reducers/conversationReducer/conversationActions'
import { createSelectOptions } from '@helpers/createSelectOptions'
import { messages } from '@constants/validationMessages'

export const AddInterlocutor = ({closeHandler}) => {
	const dispatch = useDispatch()
	const conversation = useSelector(state => state.conversation.data)
	const users = useSelector(state => state.users.users)
	const {control, handleSubmit} = useForm({mode: 'onBlur'})

	useEffect(() => {
		dispatch(getUsersStart())
	}, [])

	const conversationalists = []
	conversation.conversationalists.map(interlocutor => {
		conversationalists.push(interlocutor.id)
	})

	const selectOptions = createSelectOptions(users, conversationalists)

	const addInterlocutorSubmitHandler = (data) => {
		data.conversationID = conversation.id
		data.conversationalists = conversationalists
		data.conversationalists.push(data.interlocutorID)

		dispatch(addInterlocutorStart(data))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<h3 className={styles.title}>Add people</h3>
				<p className={styles.note}>Please select the person you want to add to the conversation</p>

				<form className={styles.form}
							onSubmit={handleSubmit(addInterlocutorSubmitHandler)}
				>
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
						<PrimaryButton title={'Cancel'}
													 modifyClass={'cancel'}
													 handler={closeHandler}
						/>
						<PrimaryButton title={'Add'}
													 type={'submit'}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}
