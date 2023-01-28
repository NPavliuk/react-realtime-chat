import { routeNames } from '@constants/routeNames'
import { SignIn } from '@views/auth/SignIn/SignIn'
import { SignUp } from '@views/auth/SignUp/SignUp'
import { NotFound } from '@views/error/NotFound/NotFound'

export const publicRoutes = [
  {path: routeNames.HOME, exact: true, element: <SignIn/>},
  {path: routeNames.SIGN_IN, exact: true, element: <SignIn/>},
  {path: routeNames.SIGN_UP, exact: true, element: <SignUp/>},
  {path: routeNames.ANY, exact: true, element: <NotFound/>}
]
