import styles from './SecuritySettingsForm.module.scss'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { useForm } from 'react-hook-form'
import { PasswordConfirmInput, PasswordInput } from '@components/ui/form/inputs'
import { useDispatch } from 'react-redux'
import { updatePasswordStart } from '@store/reducers/authReducer/authActions'

export const SecuritySettingsForm = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, reset, watch, formState: {errors, isDirty}} = useForm({mode: 'onBlur'})

  const submitFormHandler = (data) => {
    dispatch(updatePasswordStart(data))
    reset()
  }

  const cancelFormHandler = () => {
    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitFormHandler)}>
      <div className={styles.group}>
        <div className={styles.header}>
          <h5 className={styles.title}>Change password</h5>
          <p className={styles.description}>Please do not share your password with anyone</p>
        </div>
        <div className={styles.item}>
          <PasswordInput register={register} errors={errors} label={false} required={false} id={'newPassword'}
                         placeholder={'Enter new password'} title={'New password'}/>
        </div>
        <div className={styles.item}>
          <PasswordConfirmInput register={register} errors={errors} watch={watch} label={false} required={false}
                                id={'confirmNewPassword'} passwordId={'newPassword'}
                                placeholder={'Repeat new password'} title={'Confirm new password'}/>
        </div>
      </div>

      {
        isDirty ?
          <div className={styles.controls}>
            <CancelButton title={'Cancel'} handler={cancelFormHandler}/>
            <SubmitButton title={'Save'}/>
          </div>
          : null
      }
    </form>
  )
}
