import { routeNames } from '@constants/routeNames'
import { NotFound } from '@views/error/NotFound/NotFound'
import { Chat } from '@views/Chat/Chat'

export const privateRoutes = [
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
  {path: routeNames.CHAT, exact: true, element: <Chat/>},
]
