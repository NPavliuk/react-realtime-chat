import styles from './AddGroupConversationForm.module.scss'
import { PrimaryButton } from '@components/ui/buttons'
import { TextInput } from '@components/ui/form/inputs'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createGroupConversationStart } from '@store/reducers/conversationReducer/conversationActions'

export const AddGroupConversationForm = ({closeHandler}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.data)
	const {control, register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

	const addGroupConversationSubmitHandler = (data) => {
		data.userID = user.id
		data.navigate = navigate

		dispatch(createGroupConversationStart(data))
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(addGroupConversationSubmitHandler)}>
			<div className={styles.item}>
				<TextInput register={register} errors={errors} title={'Group Name'} id={'name'} label={true} placeholder={'e.g rest'}
									 required={true}/>
			</div>
			<div className={styles.item}>
				<TextInput register={register} title={'Avatar (optional)'} id={'avatar'} label={true}
									 placeholder={'Enter group avatar URL'}/>
			</div>
			<div className={styles.item}>
				<TextInput register={register} title={'Description (optional)'} id={'description'} label={true}
									 placeholder={'Enter group description'}/>
			</div>
			<div className={styles.controls}>
				<PrimaryButton title={'Cancel'} modifyClass={'cancel'} handler={closeHandler}/>
				<PrimaryButton title={'Create'} type={'submit'}/>
			</div>
		</form>
	)
}
