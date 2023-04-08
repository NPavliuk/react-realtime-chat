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

  // Add Contact messages
  contactAdded: '[] successful added to your contacts',
  contactAlreadyExist: '[] already your contact',
  contactNotExist: 'User with [] email does not exist',
  contactYourself: 'You can\'t add yourself to contacts',
  contactRemoved: '[] successful removed from your contacts',

	// Add Conversation messages
	conversationAlreadyExist: 'Conversation with this user already exist',

  // Settings messages
  profileUpdated: 'Profile successful updated',
  passwordUpdated: 'Password successful updated',
  passwordUpdateFailed: 'Update password failed. Please try again',

  // General messages
  somethingWrong: 'Something go wrong. Please try again',
}
