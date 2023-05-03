export const actionTypes = {
	SET_LOCAL_SESSION: 'SET-LOCAL-SESSION',

	WATCH_SESSION_START: 'WATCH-SESSION-START',
	WATCH_SESSION_SUCCESS: 'WATCH-SESSION-SUCCESS',
	WATCH_SESSION_FAIL: 'WATCH-SESSION-FAIL',

	SIGN_UP_START: 'SIGNUP-START',
	SIGN_UP_SUCCESS: 'SIGNUP-SUCCESS',
	SIGN_UP_FAIL: 'SIGNUP-FAIL',

	SIGN_IN_START: 'SIGN-IN-START',
	SIGN_IN_SUCCESS: 'SIGN-IN-SUCCESS',
	SIGN_IN_FAIL: 'SIGN-IN-FAIL',

	SIGN_OUT_START: 'SIGN-OUT-START',
	SIGN_OUT_SUCCESS: 'SIGN-OUT-SUCCESS',
	SIGN_OUT_FAIL: 'SIGN-OUT-FAIL',

	UPDATE_PASSWORD_START: 'UPDATE-PASSWORD-START',
	UPDATE_PASSWORD_SUCCESS: 'UPDATE-PASSWORD-SUCCESS',
	UPDATE_PASSWORD_FAIL: 'UPDATE-PASSWORD-FAIL',

	GET_USER_DATA_START: 'GET-USER-DATA-START',
	GET_USER_DATA_SUCCESS: 'GET-USER-DATA-SUCCESS',
	GET_USER_DATA_FAIL: 'GET-USER-DATA-FAIL',

	UPDATE_USER_DATA_START: 'UPDATE-USER-DATA-START',
	UPDATE_USER_DATA_SUCCESS: 'UPDATE-USER-DATA-SUCCESS',
	UPDATE_USER_DATA_FAIL: 'UPDATE-USER-DATA-FAIL',

	GET_USERS_START: 'GET-USERS-START',
	GET_USERS_SUCCESS: 'GET-USERS-SUCCESS',
	GET_USERS_FAIL: 'GET-USERS-FAIL',

	OPEN_PROFILE_BAR: 'OPEN-PROFILE-BAR',
	CLOSE_PROFILE_BAR: 'CLOSE-PROFILE-BAR',

	GET_PROFILE_INFO_START: 'GET-PROFILE-INFO-START',
	GET_PROFILE_INFO_SUCCESS: 'GET-PROFILE-INFO-SUCCESS',
	GET_PROFILE_INFO_FAIL: 'GET-PROFILE-INFO-FAIL',

	OPEN_CONVERSATION_BAR: 'OPEN-CONVERSATION-BAR',
	CLOSE_CONVERSATION_BAR: 'CLOSE-CONVERSATION-BAR',

	OPEN_ADD_CONVERSATION_MODAL: 'OPEN-ADD-CONVERSATION-MODAL',
	CLOSE_ADD_CONVERSATION_MODAL: 'CLOSE-ADD-CONVERSATION-MODAL',

	CREATE_DIRECT_CONVERSATION_START: 'CREATE-DIRECT-CONVERSATION-START',
	CREATE_DIRECT_CONVERSATION_SUCCESS: 'CREATE-DIRECT-CONVERSATION-SUCCESS',
	CREATE_DIRECT_CONVERSATION_FAIL: 'CREATE-DIRECT-CONVERSATION-FAIL',

	CREATE_GROUP_CONVERSATION_START: 'CREATE-GROUP-CONVERSATION-START',
	CREATE_GROUP_CONVERSATION_SUCCESS: 'CREATE-GROUP-CONVERSATION-SUCCESS',
	CREATE_GROUP_CONVERSATION_FAIL: 'CREATE-GROUP-CONVERSATION-FAIL',

	REMOVE_CONVERSATION_START: 'REMOVE-CONVERSATION-START',
	REMOVE_CONVERSATION_SUCCESS: 'REMOVE-CONVERSATION-SUCCESS',
	REMOVE_CONVERSATION_FAIL: 'REMOVE-CONVERSATION-FAIL',

	GET_CONVERSATIONS_START: 'GET-CONVERSATIONS-START',
	GET_CONVERSATIONS_SUCCESS: 'GET-CONVERSATIONS-SUCCESS',
	GET_CONVERSATIONS_FAIL: 'GET-CONVERSATIONS-FAIL',

	WATCH_CONVERSATION_START: 'WATCH-CONVERSATION-START',
	WATCH_CONVERSATION_SUCCESS: 'WATCH-CONVERSATION-SUCCESS',
	WATCH_CONVERSATION_FAIL: 'WATCH-CONVERSATION-FAIL',

	WATCH_CONVERSATIONS_START: 'WATCH-CONVERSATIONS-START',
	WATCH_CONVERSATIONS_SUCCESS: 'WATCH-CONVERSATIONS-SUCCESS',
	WATCH_CONVERSATIONS_FAIL: 'WATCH-CONVERSATIONS-FAIL',

	OPEN_ADD_INTERLOCUTOR_MODAL: 'OPEN-ADD-INTERLOCUTOR-MODAL',
	CLOSE_ADD_INTERLOCUTOR_MODAL: 'CLOSE-ADD-INTERLOCUTOR-MODAL',

	ADD_INTERLOCUTOR_START: 'ADD-INTERLOCUTOR-START',
	ADD_INTERLOCUTOR_SUCCESS: 'ADD-INTERLOCUTOR-SUCCESS',
	ADD_INTERLOCUTOR_FAIL: 'ADD-INTERLOCUTOR-FAIL',

	REMOVE_INTERLOCUTOR_START: 'REMOVE-INTERLOCUTOR-START',
	REMOVE_INTERLOCUTOR_SUCCESS: 'REMOVE-INTERLOCUTOR-SUCCESS',
	REMOVE_INTERLOCUTOR_FAIL: 'REMOVE-INTERLOCUTOR-FAIL',

	OPEN_EDIT_CONVERSATION_MODAL: 'OPEN-EDIT-CONVERSATION-MODAL',
	CLOSE_EDIT_CONVERSATION_MODAL: 'CLOSE-EDIT-CONVERSATION-MODAL',

	EDIT_CONVERSATION_START: 'EDIT-CONVERSATION-START',
	EDIT_CONVERSATION_SUCCESS: 'EDIT-CONVERSATION-SUCCESS',
	EDIT_CONVERSATION_FAIL: 'EDIT-CONVERSATION-FAIL',

	LEAVE_CONVERSATION_START: 'LEAVE-CONVERSATION-START',
	LEAVE_CONVERSATION_SUCCESS: 'LEAVE-CONVERSATION-SUCCESS',
	LEAVE_CONVERSATION_FAIL: 'LEAVE-CONVERSATION-FAIL',

	CHOOSE_CONVERSATION: 'CHOOSE-CONVERSATION',
	SET_CONVERSATION_INPUT: 'SET-CONVERSATION-INPUT',
	SET_CONVERSATIONS_FILTER: 'SET-CONVERSATIONS-FILTER',

	SET_MESSAGE_START: 'SET-MESSAGE-START',
	SET_MESSAGE_SUCCESS: 'SET-MESSAGE-SUCCESS',
	SET_MESSAGE_FAIL: 'SET-MESSAGE-FAIL',

	CLEAR_MESSAGES_START: 'CLEAR-MESSAGES-START',
	CLEAR_MESSAGES_SUCCESS: 'CLEAR-MESSAGES-SUCCESS',
	CLEAR_MESSAGES_FAIL: 'CLEAR-MESSAGES-FAIL',

	WATCH_MESSAGES_START: 'WATCH-MESSAGES-START',
	WATCH_MESSAGES_SUCCESS: 'WATCH-MESSAGES-SUCCESS',
	WATCH_MESSAGES_FAIL: 'WATCH-MESSAGES-FAIL',

	REMOVE_MESSAGE_START: 'REMOVE-MESSAGE-START',
	REMOVE_MESSAGE_SUCCESS: 'REMOVE-MESSAGE-SUCCESS',
	REMOVE_MESSAGE_FAIL: 'REMOVE-MESSAGE-FAIL',

	EDIT_MESSAGE_START: 'EDIT-MESSAGE-START',
	EDIT_MESSAGE_SUCCESS: 'EDIT-MESSAGE-SUCCESS',
	EDIT_MESSAGE_FAIL: 'EDIT-MESSAGE-FAIL',

	LIKE_MESSAGE_START: 'LIKE-MESSAGE-START',
	LIKE_MESSAGE_SUCCESS: 'LIKE-MESSAGE-SUCCESS',
	LIKE_MESSAGE_FAIL: 'LIKE-MESSAGE-FAIL',

	UNLIKE_MESSAGE_START: 'UNLIKE-MESSAGE-START',
	UNLIKE_MESSAGE_SUCCESS: 'UNLIKE-MESSAGE-SUCCESS',
	UNLIKE_MESSAGE_FAIL: 'UNLIKE-MESSAGE-FAIL',

	SET_READED_MESSAGE_START: 'SET-READED-MESSAGE-START',
	SET_READED_MESSAGE_SUCCESS: 'SET-READED-MESSAGE-SUCCESS',
	SET_READED_MESSAGE_FAIL: 'SET-READED-MESSAGE-FAIL',

	OPEN_EDIT_MESSAGE_MODE: 'OPEN-EDIT-MESSAGE-MODE',
	CLOSE_EDIT_MESSAGE_MODE: 'CLOSE-EDIT-MESSAGE-MODE',

	OPEN_REPLY_MESSAGE_MODE: 'OPEN-REPLY-MESSAGE-MODE',
	CLOSE_REPLY_MESSAGE_MODE: 'CLOSE-REPLY-MESSAGE-MODE',
}
