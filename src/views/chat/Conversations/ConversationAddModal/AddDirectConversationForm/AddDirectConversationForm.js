import styles from './AddDirectConversationForm.module.scss'
import { CancelButton, SubmitButton } from '@components/ui/buttons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getContactsStart } from '@store/reducers/contactsReducer/contactsActions'
import { SingleContactSelect } from '@components/ui/form/selects'

export const AddDirectConversationForm = ({closeHandler}) => {
  const selectOptions = []
  const userId = useSelector(state => state.auth.uid)
  const contacts = useSelector(state => state.contacts.contacts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getContactsStart(userId))
  }, [])

  contacts.map(contact => {
    const selectOption = {
      label: contact.displayName,
      value: contact.email,
      contact: contact
    }

    selectOptions.push(selectOption)
  })

  return (
    <form className={styles.form}>
      <div className={styles.select}>
        <SingleContactSelect options={selectOptions} />
      </div>

      <div className={styles.controls}>
        <CancelButton title={'Cancel'} handler={closeHandler}/>
        <SubmitButton title={'Create'}/>
      </div>
    </form>
  )
}
