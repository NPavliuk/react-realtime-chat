import { messages } from '@constants/validationMessages'
import { patterns } from '@constants/validationPatterns'
import { classNames } from '@helpers/classNames'
import styles from './EmailInput.module.scss'

export const EmailInput = ({register, errors, label, placeholder, defaultValue}) => {
  return (
    <div className={styles.group}>
      <label className={classNames({
        [styles.label]: true,
        [styles.show]: label
      })} htmlFor={'email'}>Email address</label>
      <input type={'text'}
             id={'email'}
             autoComplete={'email'}
             className={styles.input}
             placeholder={placeholder ? placeholder : 'Email address'}
             defaultValue={defaultValue ? defaultValue : ''}
             {...register('email', {
               required: messages.requiredField,
               pattern: {value: patterns.email, message: messages.invalidEmail}
             })}/>
      {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}
    </div>
  )
}
