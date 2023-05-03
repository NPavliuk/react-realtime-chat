import styles from './ConversationEdit.module.scss'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '@components/ui/buttons'
import { TextInput } from '@components/ui/form/inputs'
import { useDispatch, useSelector } from 'react-redux'
import { editConversationStart } from '@store/reducers/conversationReducer/conversationActions'

export const ConversationEdit = ({closeHandler}) => {
	const dispatch = useDispatch()
	const conversation = useSelector(state => state.conversation)
	const {register, handleSubmit, formState: {errors, isDirty}} = useForm({
		mode: 'onBlur',
		defaultValues: conversation.data
	})

	const editConversationSubmitHandler = (data) => {
		dispatch(editConversationStart(data))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<h3 className={styles.title}>Edit conversation</h3>
				<p className={styles.note}>Be sure to confirm the changes before exiting the modal window</p>
				<form className={styles.form} onSubmit={handleSubmit(editConversationSubmitHandler)}>
					<div className={styles.item}>
						<TextInput register={register} errors={errors} title={'Group Name'} id={'name'} label={true}
											 placeholder={'e.g rest'}
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
						{
							isDirty ?
								<PrimaryButton title={'Edit'} type={'submit'}/>
								: null
						}
					</div>

				</form>

			</div>
		</div>
	)
}
