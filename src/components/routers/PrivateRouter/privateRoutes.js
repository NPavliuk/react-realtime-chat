import { routeNames } from '@constants/routeNames'
import { NotFound } from '@views/error/NotFound/NotFound'
import { Home } from '@views/chat/Home/Home'
import { Settings } from '@views/chat/Settings/Settings'

export const privateRoutes = [
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
  {path: routeNames.HOME, exact: true, element: <Home/>},
  {path: routeNames.SETTINGS, exact: true, element: <Settings/>}
]
