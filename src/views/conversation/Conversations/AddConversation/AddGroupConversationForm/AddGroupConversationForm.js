import styles from './AddGroupConversationForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '@components/ui/buttons'
import { TextInput } from '@components/ui/form/inputs'
import { createGroupConversationStart } from '@store/reducers/conversationReducer/conversationActions'

export const AddGroupConversationForm = ({closeHandler}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.data)
	const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

	const addGroupConversationSubmitHandler = (data) => {
		data.userID = user.id
		data.navigate = navigate
		dispatch(createGroupConversationStart(data))
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(addGroupConversationSubmitHandler)}>
			<div className={styles.item}>
				<TextInput id={'name'}
									 title={'Group Name'}
									 placeholder={'e.g rest'}
									 errors={errors}
									 register={register}
									 label={true}
									 required={true}/>
			</div>
			<div className={styles.item}>
				<TextInput id={'avatar'}
									 title={'Avatar (optional)'}
									 placeholder={'Enter group avatar URL'}
									 register={register}
									 label={true}
				/>
			</div>
			<div className={styles.item}>
				<TextInput id={'description'}
									 title={'Description (optional)'}
									 placeholder={'Enter group description'}
									 register={register}
									 label={true}
				/>
			</div>
			<div className={styles.controls}>
				<PrimaryButton title={'Cancel'}
											 modifyClass={'cancel'}
											 handler={closeHandler}
				/>
				<PrimaryButton title={'Create'} 
											 type={'submit'}
				/>
			</div>
		</form>
	)
}
