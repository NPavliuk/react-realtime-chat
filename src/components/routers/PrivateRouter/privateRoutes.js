import { routeNames } from '@constants/routeNames'
import { NotFound } from '@views/error/NotFound/NotFound'

export const privateRoutes = [
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
]
