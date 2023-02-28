import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signInStart } from '@store/reducers/authReducer/authActions'
import { PasswordInput, EmailInput } from '@components/ui/form/inputs'
import { SubmitButton } from '@components/ui/buttons'
import styles from './SignInForm.module.scss'

export const SignInForm = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

  const onSubmit = (data) => {
    dispatch(signInStart(data))
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <div className={styles.item}>
            <EmailInput register={register} errors={errors}/>
          </div>
          <div className={styles.item}>
            <PasswordInput register={register} errors={errors}/>
          </div>
        </div>

        <Link to="#" className={styles.link}>Forgot your password?</Link>

        <div className={styles.button}>
          <SubmitButton title={'Sign In'}/>
        </div>
      </form>
    </div>
  )
}
