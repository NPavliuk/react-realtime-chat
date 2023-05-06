import styles from './ProfileSettingsForm.module.scss'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import { EmailInput, TextArea, TextInput, DateInput } from '@components/ui/form/inputs'
import { updateUserDataStart } from '@store/reducers/userReducer/userActions'

export const ProfileSettingsForm = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.data)
	const {register, handleSubmit, reset, formState: {errors, isDirty}} = useForm({mode: 'onBlur', defaultValues: user})

	useEffect(() => {
		reset(user)
	}, [user])

	const submitFormHandler = (data) => {
		if (JSON.stringify(data) !== JSON.stringify(user)) {
			dispatch(updateUserDataStart(data))
		}
	}

	const cancelFormHandler = () => {
		reset(user)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(submitFormHandler)}>
			<div className={styles.group}>
				<div className={styles.item}>
					<TextInput id={'avatar'}
										 title={'Avatar'}
										 placeholder={'Enter your avatar URL'}
										 errors={errors}
										 register={register}
										 label={true}
										 required={false}
					/>
				</div>
				<div className={styles.item}>
					<TextInput id={'name'}
										 title={'User name'}
										 placeholder={'Enter your name'}
										 errors={errors}
										 register={register}
										 label={true}
										 required={true}
					/>
				</div>
				<div className={styles.item}>
					<TextInput id={'role'}
										 title={'Role'}
										 placeholder={'Enter your role position'}
										 errors={errors}
										 register={register}
										 label={true}
										 required={false}
					/>
				</div>
				<div className={styles.item}>
					<TextArea id={'bio'}
										title={'Bio'}
										placeholder={'Enter something about yourself'}
										errors={errors}
										register={register}
										label={true}
										required={false}
					/>
				</div>
			</div>

			<div className={styles.group}>
				<div className={styles.header}>
					<h5 className={styles.title}>Personal Information</h5>
					<p className={styles.description}>Please do not share your password with anyone</p>
				</div>
				<div className={styles.item}>
					<EmailInput placeholder={'Enter your email address'}
											errors={errors}
											register={register}
											label={true}
					/>
				</div>
				<div className={styles.item}>
					<TextInput id={'phone'}
										 placeholder={'Enter your phone number'}
										 title={'Phone number'}
										 errors={errors}
										 register={register}
										 label={true}
										 required={false}
					/>
				</div>
				<div className={styles.item}>
					<DateInput id={'birthday'}
										 title={'Birth day'}
										 placeholder={'Choose your birth day'}
										 errors={errors}
										 register={register}
										 label={true}
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
