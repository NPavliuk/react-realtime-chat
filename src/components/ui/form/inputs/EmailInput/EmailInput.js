import { messages } from '@constants/validationMessages'
import { patterns } from '@constants/validationPatterns'
import styles from './EmailInput.module.scss'

export const EmailInput = ({register, errors, classes}) => {
  return (
    <div className={classes}>
      <label className={styles.label} htmlFor="email">Email address</label>
      <input type="text"
             className={styles.input}
             autoComplete="email"
             placeholder="Email address"
             {...register('email', {
               required: messages.requiredField,
               pattern: {value: patterns.email, message: messages.invalidEmail}
             })}/>
      {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}
    </div>
  )
}
