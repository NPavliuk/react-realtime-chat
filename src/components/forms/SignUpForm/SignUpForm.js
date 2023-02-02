import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signUpStart } from '@store/reducers/authReducer/authActions'
import { PasswordInput, EmailInput, TextInput, PasswordConfirmInput } from '@components/ui/form/inputs'
import { SubmitButton } from '@components/ui/buttons'
import styles from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const dispatch = useDispatch()
  const {register, watch, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onBlur'})

  const onSubmit = (data) => {
    dispatch(signUpStart(data))
    reset()
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextInput classes={'mb-3'} register={register} errors={errors} title={'User name'} id={'displayName'}/>
        <EmailInput classes={'mb-3'} register={register} errors={errors}/>
        <PasswordInput classes={'mb-3'} register={register} errors={errors}/>
        <PasswordConfirmInput classes={'mb-7'} register={register} errors={errors} watch={watch}/>
        <SubmitButton title={'Sign Up'}/>
      </form>
    </div>
  )
}
