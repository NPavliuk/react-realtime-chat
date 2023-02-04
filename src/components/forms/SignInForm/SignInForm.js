import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart } from '@store/reducers/authReducer/authActions'
import { PasswordInput, EmailInput } from '@components/ui/form/inputs'
import { SubmitButton } from '@components/ui/buttons'
import { routeNames } from '@constants/routeNames'
import styles from './SignInForm.module.scss'

export const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

  const onSubmit = (data) => {
    dispatch(signInStart(data))
    navigate(routeNames.DIALOGS)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <EmailInput classes={'mb-3'} register={register} errors={errors}/>
        <PasswordInput classes={'mb-1'} register={register} errors={errors}/>
        <Link to="#" className={styles.link}>Forgot your password?</Link>
        <SubmitButton title={'Sign In'} />
      </form>
    </div>
  )
}
