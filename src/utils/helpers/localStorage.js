export const saveSessionToLocalStorage = (session) => {
  localStorage.setItem('react-realtime-conversation-session', session)
}

export const removeSessionFromLocalStorage = () => {
  localStorage.removeItem('react-realtime-conversation-session')
}

export const getSessionFromLocalStorage = () => {
  return localStorage.getItem('react-realtime-conversation-session')
}
