import styles from './SecuritySettingsForm.module.scss'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from '@components/ui/buttons'
import { PasswordConfirmInput, PasswordInput } from '@components/ui/form/inputs'
import { updatePasswordStart } from '@store/reducers/authReducer/authActions'

export const SecuritySettingsForm = () => {
	const dispatch = useDispatch()
	const {register, handleSubmit, reset, watch, formState: {errors, isDirty}} = useForm({mode: 'onBlur'})

	const submitFormHandler = (data) => {
		dispatch(updatePasswordStart(data))
		reset()
	}

	const cancelFormHandler = () => {
		reset()
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(submitFormHandler)}>
			<div className={styles.group}>
				<div className={styles.header}>
					<h5 className={styles.title}>Change password</h5>
					<p className={styles.description}>Please do not share your password with anyone</p>
				</div>
				<div className={styles.item}>
					<PasswordInput id={'newPassword'}
												 title={'New password'}
												 placeholder={'Enter new password'}
												 errors={errors}
												 register={register}
												 label={false}
												 required={false}
					/>
				</div>
				<div className={styles.item}>
					<PasswordConfirmInput id={'confirmNewPassword'}
																passwordId={'newPassword'}
																placeholder={'Repeat new password'} title={'Confirm new password'}
																errors={errors}
																register={register}
																watch={watch}
																label={false}
																required={false}
					/>
				</div>
			</div>
			{
				isDirty ?
					<div className={styles.controls}>
						<PrimaryButton title={'Cancel'}
													 modifyClass={'cancel'}
													 handler={cancelFormHandler}
						/>
						<PrimaryButton title={'Save'}
													 type={'submit'}
						/>
					</div>
					: null
			}
		</form>
	)
}
