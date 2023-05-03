export const messages = {
  // Auth validation messages
  signUpSuccess: 'You successfully created account',
  signInSuccess: 'You successfully logged in',
  signOutSuccess: 'You successfully logged out',
  signInFailed: 'Incorrect email or password',

  // Form validation messages
  requiredField: 'Please fill this field',
  invalidEmail: 'Please enter correct email',
  invalidPassword: 'Password should contain at least one letter and one number',
  shortPassword: 'Password should contain minimum eight characters',
  notMatchedPasswords: 'Passwords doesn\'t matched',
  toManyCharacters: 'Too many characters',

	// Add GroupConversation messages
	conversationAlreadyExist: 'GroupConversation with this user already exist',

  // Settings messages
  profileUpdated: 'Profile successful updated',
  passwordUpdated: 'Password successful updated',
  passwordUpdateFailed: 'Update password failed. Please try again',

	// GroupConversation messages
	leaveConversationSuccess: 'You have successfully left the conversation',
	conversationUpdateSuccess: 'Conversation settings updated successfully',
	conversationRemoveSuccess: 'Conversation successfully removed',
	conversationMessagesRemoveSuccess: 'Conversation history has been cleared successfully',
	conversationInterlocutorRemoveSuccess: 'The interlocutor has been successfully removed from the conversation',

  // General messages
  somethingWrong: 'Something go wrong. Please try again',
}
