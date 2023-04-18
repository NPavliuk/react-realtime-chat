import { combineReducers } from 'redux'
import { userReducer } from '@store/reducers/userReducer/userReducer'
import { authReducer } from '@store/reducers/authReducer/authReducer'
import { usersReducer } from '@store/reducers/usersReducer/usersReducer'
import { profileReducer } from '@store/reducers/profileReducer/profileReducer'
import { conversationReducer } from '@store/reducers/conversationReducer/conversationReducer'
import { conversationsReducer } from '@store/reducers/conversationsReducer/conversationsReducer'

export const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	users: usersReducer,
	conversation: conversationReducer,
	conversations: conversationsReducer,
	profile: profileReducer
})
