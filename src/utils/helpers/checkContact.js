export const checkIsContact = (userId, contacts) => {
  const checked = contacts.filter(contact => contact.uid === userId)

  if (checked.length > 0) {
    return true
  } else {
    return false
  }
}
