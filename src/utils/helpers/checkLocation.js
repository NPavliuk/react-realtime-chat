export const checkLocationParent = (path, route) => {
  if (path.split('/')[1] === route.split('/')[1])  {
    return true
  } else {
    return false
  }
}
