import { messages } from '@constants/validationMessages'
import { patterns } from '@constants/validationPatterns'
import styles from './PasswordInput.module.scss'

export const PasswordInput = ({register, errors, classes}) => {
  return (
    <div className={classes}>
      <label className={styles.label} htmlFor="password">Password</label>
      <input type="password"
             className={styles.input}
             autoComplete="password"
             placeholder="Password"
             {...register('password', {
               required: messages.requiredField,
               minLength: {value: 8, message: messages.shortPassword},
               pattern: {value: patterns.password, message: messages.invalidPassword}
             })}/>
      {errors?.password && <p className={styles.error}>{errors?.password?.message}</p>}
    </div>
  )
}
