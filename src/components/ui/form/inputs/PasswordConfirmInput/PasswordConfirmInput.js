import { messages } from '@constants/validationMessages'
import styles from './PasswordConfirmInput.module.scss'

export const PasswordConfirmInput = ({classes, register, errors, watch}) => {
  return (
    <div className={classes}>
      <label className={styles.label} htmlFor="passwordConfirm">Confirm password</label>
      <input type="password"
             className={styles.input}
             autoComplete="passwordConfirm"
             placeholder="Confirm password"
             {...register('passwordConfirm', {
               required: messages.requiredField,
               validate: (value) => {
                 if (watch('password') !== value) {
                   return messages.notMatchedPasswords
                 }
               }
             })}/>
      {errors?.passwordConfirm && <p className={styles.error}>{errors?.passwordConfirm?.message}</p>}
    </div>
  )
}
