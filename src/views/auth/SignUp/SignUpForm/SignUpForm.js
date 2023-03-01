import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signUpStart } from '@store/reducers/authReducer/authActions'
import { PasswordInput, EmailInput, TextInput, PasswordConfirmInput } from '@components/ui/form/inputs'
import { SubmitButton } from '@components/ui/buttons'
import styles from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const dispatch = useDispatch()
  const {register, watch, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

  const onSubmit = (data) => {
    dispatch(signUpStart(data))
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} title={'User name'} id={'displayName'} required={true}/>
        </div>
        <div className={styles.item}>
          <EmailInput register={register} errors={errors}/>
        </div>
        <div className={styles.item}>
          <PasswordInput register={register} errors={errors} id={'password'} required={true}/>
        </div>
        <div className={styles.item}>
          <PasswordConfirmInput register={register} errors={errors} watch={watch} id={'passwordConfirm'}
                                passwordId={'password'} required={true}/>
        </div>
        <div className={styles.button}>
          <SubmitButton title={'Sign Up'}/>
        </div>
      </form>
    </div>
  )
}
