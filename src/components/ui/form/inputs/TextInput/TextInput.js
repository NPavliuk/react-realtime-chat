import { messages } from '@constants/validationMessages'
import styles from './TextInput.module.scss'

export const TextInput = ({classes, register, errors, id, title}) => {
  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={id}>{title}</label>
      <input type="text"
             className={styles.input}
             autoComplete={id}
             placeholder={title}
             {...register(id, {
               required: messages.requiredField
             })}/>
      {errors?.[id] && <p className={styles.error}>{errors?.[id]?.message}</p>}
    </div>
  )
}
