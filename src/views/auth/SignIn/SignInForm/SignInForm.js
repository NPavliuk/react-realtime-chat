import styles from './SignInForm.module.scss'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { PrimaryButton } from '@components/ui/buttons'
import { PasswordInput, EmailInput } from '@components/ui/form/inputs'
import { signInStart } from '@store/reducers/authReducer/authActions'

export const SignInForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

	const onSubmit = (data) => {
		data.navigate = navigate
		dispatch(signInStart(data))
	}

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.group}>
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
				</div>

				<Link to="#" className={styles.link}>Forgot your password?</Link>

				<div className={styles.button}>
					<PrimaryButton title={'Sign In'}
												 type={'submit'}/>
				</div>
			</form>
		</div>
	)
}

// TODO: Add logic for recovering password
