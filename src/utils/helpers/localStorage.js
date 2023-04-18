export const saveSessionToLocalStorage = (session) => {
  localStorage.setItem('react-realtime-chat-session', session)
}

export const removeSessionFromLocalStorage = () => {
  localStorage.removeItem('react-realtime-chat-session')
}

export const getSessionFromLocalStorage = () => {
  return localStorage.getItem('react-realtime-chat-session')
}
