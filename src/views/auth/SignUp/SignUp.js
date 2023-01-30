import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { patterns } from '@constants/validationPatterns'
import { messages } from '@constants/validationMessages'
import { signUpStart } from '@store/reducers/userReducer/userActions'

export const SignUp = () => {
  const dispatch = useDispatch()
  const {register, watch, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onBlur'})
  const onSubmit = (data) => {
    dispatch(signUpStart(data))
    reset()
  }

  return (
    <div>
      Sign Up
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="displayName">Name</label>
          <input type="displayName"
                 {...register('displayName', {
                   required: messages.requiredField,
                 })}/>
          {errors?.displayName && <p>{errors?.displayName?.message}</p>}
        </div>
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
        <div>
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            {...register('passwordConfirm', {
              required: messages.requiredField,
              validate: (value) => {
                if (watch('password') !== value) {
                  return messages.notMatchedPasswords
                }
              }
            })}/>
          {errors?.passwordConfirm && <p>{errors?.passwordConfirm?.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
