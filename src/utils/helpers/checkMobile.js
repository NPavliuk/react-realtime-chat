export const checkIfMobile = () => {
  const width = window.innerWidth

  if (width > 640) {
    return false
  } else {
    return true
  }
}
