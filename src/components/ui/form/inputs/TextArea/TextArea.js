import { messages } from '@constants/validationMessages'
import { classNames } from '@helpers/classNames'
import styles from './TextArea.module.scss'

export const TextArea = ({register, errors, id, title, label, defaultValue, placeholder, required}) => {
  return (
    <div className={styles.group}>
      <label className={classNames({
        [styles.label]: true,
        [styles.show]: label
      })} htmlFor={id}>{title}</label>
      <textarea autoComplete={id}
                className={styles.input}
                placeholder={placeholder ? placeholder : title}
                defaultValue={defaultValue ? defaultValue : ''}
                {...register(id, {
                  required: required ? messages.requiredField : false,
                  maxLength: {value: 600, message: messages.toManyCharacters}
                })}>
        </textarea>
      {errors?.[id] && <p className={styles.error}>{errors?.[id]?.message}</p>}
    </div>

  )
}
