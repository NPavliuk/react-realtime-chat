import { routeNames } from '@constants/routeNames'
import { SignIn } from '@views/auth/SignIn/SignIn'
import { SignUp } from '@views/auth/SignUp/SignUp'

export const publicRoutes = [
  {path: routeNames.ANY, exact: true, element: <SignIn/>},
  {path: routeNames.HOME, exact: true, element: <SignIn/>},
  {path: routeNames.SIGN_UP, exact: true, element: <SignUp/>}
]
