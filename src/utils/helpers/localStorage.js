export const saveUserToLocalStorage = (uid) => {
  localStorage.setItem('user_uid', uid)
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user_uid')
}

export const getUserFromLocalStorage = () => {
  return localStorage.getItem('user_uid')
}
