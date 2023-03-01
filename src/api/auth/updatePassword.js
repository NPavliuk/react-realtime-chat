import { auth } from '@api/firebase'
import { updatePassword } from "firebase/auth"

export const updateUserPassword = async (newPassword) => {
  const user = auth.currentUser
  return  updatePassword(user, newPassword).then(() => {
    return null
  }).catch((error) => {
    return error.message
  })
}
