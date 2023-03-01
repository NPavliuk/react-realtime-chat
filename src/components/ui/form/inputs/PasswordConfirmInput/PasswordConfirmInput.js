import { messages } from '@constants/validationMessages'
import styles from './PasswordConfirmInput.module.scss'
import { classNames } from '@helpers/classNames'

export const PasswordConfirmInput = ({register, errors, watch, label, title, placeholder, required, id, passwordId}) => {
  return (
    <div className={styles.group}>
      <label className={classNames({
        [styles.label]: true,
        [styles.show]: label
      })} htmlFor={id}>{title ? title : 'Confirm password'}</label>
      <input type="password"
             autoComplete={id}
             className={styles.input}
             placeholder={placeholder ? placeholder : 'Confirm password'}
             {...register(id, {
               required: required ? messages.requiredField : false,
               validate: (value) => {
                 if (watch(passwordId) !== value) {
                   return messages.notMatchedPasswords
                 }
               }
             })}/>
      {errors?.[id] && <p className={styles.error}>{errors?.[id]?.message}</p>}
    </div>
  )
}
