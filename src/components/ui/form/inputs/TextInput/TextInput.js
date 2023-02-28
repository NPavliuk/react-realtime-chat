import { messages } from '@constants/validationMessages'
import { classNames } from '@helpers/classNames'
import styles from './TextInput.module.scss'

export const TextInput = ({register, errors, id, title, placeholder, label, defaultValue, required}) => {
  return (
    <div className={styles.group}>
      <label className={classNames({
        [styles.label]: true,
        [styles.show]: label
      })} htmlFor={id}>{title}</label>
      <input type={'text'}
             autoComplete={id}
             className={styles.input}
             placeholder={placeholder ? placeholder : title}
             defaultValue={defaultValue ? defaultValue : ''}
             {...register(id, {
               required: required ? messages.requiredField : false
             })}/>
      {errors?.[id] && <p className={styles.error}>{errors?.[id]?.message}</p>}
    </div>
  )
}
