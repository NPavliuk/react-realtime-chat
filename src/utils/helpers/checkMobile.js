export const checkIfMobile = () => {
  const width = window.innerWidth

  if (width > 640) {
    return false
  } else {
    return true
  }
}

export const checkIfTablet = () => {
  const width = window.innerWidth

  if (width > 767) {
    return false
  } else {
    return true
  }
}
