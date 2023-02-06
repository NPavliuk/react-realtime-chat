export const createAndDispatchSignInEvent = () => {
  const event = new CustomEvent('sign-in')
  document.dispatchEvent(event)
}

export const createAndDispatchSignOutEvent = () => {
  const event = new CustomEvent('sign-out')
  document.dispatchEvent(event)
}
