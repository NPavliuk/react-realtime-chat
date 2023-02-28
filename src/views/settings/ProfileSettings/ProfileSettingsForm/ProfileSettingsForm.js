import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { EmailInput, TextArea, TextInput, DateInput } from '@components/ui/form/inputs'
import { updateUserDataStart } from '@store/reducers/userReducer/userActions'
import styles from './ProfileSettingsForm.module.scss'

export const ProfileSettingsForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.data)
  const {register, handleSubmit, reset, formState: {errors, isDirty}} = useForm({mode: 'onBlur', defaultValues: user})

  const submitFormHandler = (data) => {
    if (JSON.stringify(data) !== JSON.stringify(user)) {
      dispatch(updateUserDataStart(data))
    }
  }

  const cancelFormHandler = () => {
    reset(user)
  }

  useEffect(() => {
    reset(user)
  }, [user])

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitFormHandler)}>
      <div className={styles.group}>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'displayName'}
                     placeholder={'Enter your name'} title={'User name'} required={true}/>
        </div>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'avatar'}
                     placeholder={'Enter your avatar URL'} title={'Avatar URL'} required={false}/>
        </div>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'role'}
                     placeholder={'Enter your role position'} title={'Role'} required={false}/>
        </div>
        <div className={styles.item}>
          <TextArea register={register} errors={errors} label={true} id={'bio'}
                    placeholder={'Enter something about yourself'} title={'Bio'} required={false}/>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.header}>
          <h5 className={styles.title}>Personal Information</h5>
          <p className={styles.description}>This information will be displayed publicly so be careful what you share</p>
        </div>
        <div className={styles.item}>
          <EmailInput register={register} errors={errors} label={true}
                      placeholder={'Enter your email address'}/>
        </div>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'phone'}
                     placeholder={'Enter your phone number'} title={'Phone number'} required={false}/>
        </div>
        <div className={styles.item}>
          <DateInput register={register} errors={errors} label={true} id={'birthday'}
                     placeholder={'Choose your birth day'} title={'Birth day'} required={false}/>
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
