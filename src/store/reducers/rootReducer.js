import { combineReducers } from 'redux'
import { userReducer } from '@store/reducers/userReducer/userReducer'

export const rootReducer = combineReducers({
  user: userReducer
})
