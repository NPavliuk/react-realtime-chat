import styles from './SignUpForm.module.scss'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '@components/ui/buttons'
import { PasswordInput, EmailInput, TextInput, PasswordConfirmInput } from '@components/ui/form/inputs'
import { signUpStart } from '@store/reducers/authReducer/authActions'

export const SignUpForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {register, watch, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

	const onSubmit = (data) => {
		data.navigate = navigate
		dispatch(signUpStart(data))
	}

	return (
		<div>
			<form className={styles.form}
						onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.item}>
					<TextInput id={'name'}
										 title={'User name'}
										 errors={errors}
										 register={register}
										 required={true}
					/>
				</div>
				<div className={styles.item}>
					<EmailInput errors={errors}
											register={register}

					/>
				</div>
				<div className={styles.item}>
					<PasswordInput id={'password'}
												 errors={errors}
												 register={register}
												 required={true}
					/>
				</div>
				<div className={styles.item}>
					<PasswordConfirmInput id={'passwordConfirm'}
																passwordId={'password'}
																watch={watch}
																errors={errors}
																register={register}
																required={true}
					/>
				</div>
				<div className={styles.button}>
					<PrimaryButton title={'Sign Up'}
												 type={'submit'}
					/>
				</div>
			</form>
		</div>
	)
}
