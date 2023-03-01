import { messages } from '@constants/validationMessages'
import { patterns } from '@constants/validationPatterns'
import styles from './PasswordInput.module.scss'
import { classNames } from '@helpers/classNames'

export const PasswordInput = ({register, errors, label, placeholder, title, required, id}) => {
  return (
    <div className={styles.group}>
      <label className={classNames({
        [styles.label]: true,
        [styles.show]: label
      })} htmlFor={id}>{title ? title : 'Password'}</label>
      <input type="password"
             autoComplete={id}
             className={styles.input}
             placeholder={placeholder ? placeholder : 'Password'}
             {...register(id, {
               required: required ? messages.requiredField : false,
               minLength: {value: 8, message: messages.shortPassword},
               pattern: {value: patterns.password, message: messages.invalidPassword}
             })}/>
      {errors?.[id] && <p className={styles.error}>{errors?.[id]?.message}</p>}
    </div>
  )
}
