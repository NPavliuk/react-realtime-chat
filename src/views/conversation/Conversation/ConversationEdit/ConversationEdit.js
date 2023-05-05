import styles from './ConversationEdit.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import { TextInput } from '@components/ui/form/inputs'
import { editConversationStart } from '@store/reducers/conversationReducer/conversationActions'

export const ConversationEdit = ({closeHandler}) => {
	const dispatch = useDispatch()
	const conversation = useSelector(state => state.conversation)
	const {register, handleSubmit, formState: {errors, isDirty}} = useForm({
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
				<form className={styles.form}
							onSubmit={handleSubmit(editConversationSubmitHandler)}
				>
					<div className={styles.item}>
						<TextInput id={'name'}
											 title={'Group Name'}
											 placeholder={'e.g rest'}
											 errors={errors}
											 register={register}
											 label={true}
											 required={true}
						/>
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
											 title={'Short description (optional)'}
											 placeholder={'Enter group description'}
											 errors={errors}
											 register={register}
											 maxLength={50}
											 label={true}
						/>
					</div>
					<div className={styles.controls}>
						<PrimaryButton title={'Cancel'}
													 modifyClass={'cancel'}
													 handler={closeHandler}
						/>
						{
							isDirty ?
								<PrimaryButton title={'Edit'}
															 type={'submit'}
								/>
								: null
						}
					</div>
				</form>
			</div>
		</div>
	)
}
