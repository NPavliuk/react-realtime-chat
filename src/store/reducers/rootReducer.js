import { combineReducers } from 'redux'
import { userReducer } from '@store/reducers/userReducer/userReducer'
import { authReducer } from '@store/reducers/authReducer/authReducer'
import { usersReducer } from '@store/reducers/usersReducer/usersReducer'
import { contactsReducer } from '@store/reducers/contactsReducer/contactsReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  contacts: contactsReducer
})
