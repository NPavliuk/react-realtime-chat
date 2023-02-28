import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { EmailInput } from '@components/ui/form/inputs'
import { SubmitButton, CancelButton} from '@components/ui/buttons'
import { addContactStart } from '@store/reducers/contactsReducer/contactsActions'
import { closeAddContactModal } from '@store/reducers/contactsReducer/contactsActions'
import styles from './ContactsAddModal.module.scss'

export const ContactsAddModal = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.uid)
  const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onSubmit'})

  const submitHandler = (data) => {
    data.uid = userId
    console.log(data)
    dispatch(addContactStart(data))
  }

  const clickHandler = () => {
    dispatch(closeAddContactModal())
    reset()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          New contact
        </h3>
        <p className={styles.note}>
          Please set email the user you would like to add to your contacts
        </p>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.item}>
            <EmailInput register={register} errors={errors}/>
          </div>
          <div className={styles.controls}>
            <CancelButton title={'Cancel'} handler={clickHandler}/>
            <SubmitButton title={'Add contact'}/>
          </div>
        </form>
      </div>
    </div>
  )
}
