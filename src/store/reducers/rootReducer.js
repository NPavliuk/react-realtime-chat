import { combineReducers } from 'redux'
import { userReducer } from '@store/reducers/userReducer/userReducer'
import { authReducer } from '@store/reducers/authReducer/authReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
})
