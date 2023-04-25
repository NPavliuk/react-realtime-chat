export const checkIfMobile = () => {
  const width = window.innerWidth
  return width > 640
}

export const checkIfTablet = () => {
  const width = window.innerWidth
  return width > 767
}
