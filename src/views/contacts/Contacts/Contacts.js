import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersStart } from '@store/reducers/usersReducer/usersActions'
import { addContactStart, getContactsStart, removeContactStart } from '@store/reducers/contactsReducer/contactsActions'

export const Contacts = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.contacts)
  const users = useSelector(state => state.users.users)
  const currentUserID = useSelector(state => state.auth.uid)

  useEffect(() => {
    dispatch(getContactsStart(currentUserID))
    dispatch(getUsersStart())
  }, [])

  const handleAddContactClick = (e) => {
    const data = {
      currentUserID: currentUserID,
      contactUserID: e.target.parentElement.id
    }

    dispatch(addContactStart(data))
  }

  const handleRemoveContactClick = (e) => {
    const data = {
      currentUserID: currentUserID,
      contactUserID: e.target.parentElement.id
    }

    dispatch(removeContactStart(data))
  }

  return (
    <div>

      <div>
        <h2>Contacts</h2>
        {contacts.length > 0 ? <div>
          {contacts.map(contact => <div key={contact.uid} id={contact.uid}>
            {contact.displayName}
            <button className={'ml-3'} onClick={handleRemoveContactClick}> Remove contact</button>
          </div>)}
        </div> : <p>You don't have any contacts yet</p>}

      </div>
      <div>
        <h2>all users</h2>
        {users ? <ul>
          {users.map(user => <li key={user.uid} id={user.uid}>
            {user.displayName}
            <button className={'ml-3'} onClick={handleAddContactClick}> Add to contact</button>
          </li>)}
        </ul> : null}
      </div>
    </div>
  )
}
