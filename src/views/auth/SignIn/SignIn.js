import { Helmet } from 'react-helmet'
import { messages } from '@constants/validationMessages'
import { patterns } from '@constants/validationPatterns'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signInStart } from '@store/reducers/authReducer/authActions'
import { useNavigate } from 'react-router-dom'
import { routeNames } from '@constants/routeNames'

export const SignIn = () => {
  const pageTitle = 'Chat - Sign in'

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'})

  const onSubmit = (data) => {
    dispatch(signInStart(data))
    navigate(routeNames.HOME)
  }

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email"
                   {...register('email', {
                     required: messages.requiredField,
                     pattern: {value: patterns.email, message: messages.invalidEmail}
                   })}/>
            {errors?.email && <p>{errors?.email?.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: messages.requiredField,
                minLength: {value: 8, message: messages.shortPassword},
                pattern: {value: patterns.password, message: messages.invalidPassword}
              })}/>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
