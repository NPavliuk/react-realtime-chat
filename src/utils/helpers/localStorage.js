export const saveUserToLocalStorage = (uid) => {
  localStorage.setItem('react-realtime-chat-user', uid)
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('react-realtime-chat-user')
}

export const getUserFromLocalStorage = () => {
  return localStorage.getItem('react-realtime-chat-user')
}
