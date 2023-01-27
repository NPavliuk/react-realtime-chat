import { routeNames } from '@constants/routeNames'
import { SignIn } from '@views/auth/SignIn/SignIn'

export const publicRoutes = [
  {path: routeNames.SIGN_IN, exact: true, element: <SignIn/>},
  {path: routeNames.ANY, exact: true, element: <SignIn/>}
]
