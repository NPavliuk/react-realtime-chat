import styles from './ProfileSettingsForm.module.scss'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { PrimaryButton } from '@components/ui/buttons'
import { EmailInput, TextArea, TextInput, DateInput } from '@components/ui/form/inputs'
import { updateUserDataStart } from '@store/reducers/userReducer/userActions'

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
		cancelFormHandler()
  }, [user])

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitFormHandler)}>
      <div className={styles.group}>

        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'avatar'}
                     placeholder={'Enter your avatar URL'} title={'Avatar'} required={false}/>
        </div>
        <div className={styles.item}>
          <TextInput register={register} errors={errors} label={true} id={'name'}
                     placeholder={'Enter your name'} title={'User name'} required={true}/>
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
          <p className={styles.description}>Please do not share your password with anyone</p>
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
            <PrimaryButton title={'Cancel'} modifyClass={'cancel'} handler={cancelFormHandler}/>
            <PrimaryButton title={'Save'} type={'submit'}/>
          </div>
          : null
      }
    </form>
  )
}
