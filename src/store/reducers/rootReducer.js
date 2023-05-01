import { combineReducers } from 'redux'
import { userReducer } from '@store/reducers/userReducer/userReducer'
import { authReducer } from '@store/reducers/authReducer/authReducer'
import { usersReducer } from '@store/reducers/usersReducer/usersReducer'
import { profileReducer } from '@store/reducers/profileReducer/profileReducer'
import { conversationReducer } from '@store/reducers/conversationReducer/conversationReducer'
import { conversationsReducer } from '@store/reducers/conversationsReducer/conversationsReducer'
import { actionTypes } from '@constants/actionTypes'
import { messagesReducer } from '@store/reducers/messagesReducer/messagesReducer'

const appReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	users: usersReducer,
	messages: messagesReducer,
	conversation: conversationReducer,
	conversations: conversationsReducer,
	profile: profileReducer
})

// Reset store on logout
export const rootReducer = (state, action) => {
	if (action.type === actionTypes.SIGN_OUT_SUCCESS) {
		return appReducer(undefined, action)
	}

	return appReducer(state, action)
}
