import { Home } from '@views/chat/Home/Home'
import { Dialogs } from '@views/chat/Dialogs/Dialogs'
import { Settings } from '@views/chat/Settings/Settings'
import { NotFound } from '@views/error/NotFound/NotFound'
import { routeNames } from '@constants/routeNames'

export const privateRoutes = [
  {path: routeNames.HOME, exact: true, element: <Home/>},
  {path: routeNames.DIALOGS, exact: true, element: <Dialogs />},
  {path: routeNames.SETTINGS, exact: true, element: <Settings/>},
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
]
