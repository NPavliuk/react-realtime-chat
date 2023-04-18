import { routeNames } from '@constants/routeNames'
import { NotFound } from '@views/error/NotFound/NotFound'
import { Conversation } from '@views/conversation/Conversation/Conversation'
import { Conversations } from '@views/conversation/Conversations/Conversations'
import { Settings } from '@views/settings/Settings/Settings'
import { ProfileSettings } from '@views/settings/ProfileSettings/ProfileSettings'
import { SecuritySettings } from '@views/settings/SecuritySettings/SecuritySettings'

export const privateRoutes = [
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
  {path: routeNames.CONVERSATION, exact: true, element: <Conversation/>},
  {path: routeNames.CONVERSATIONS, exact: true, element: <Conversations/>},
  {path: routeNames.SETTINGS, exact: true, element: <Settings/>},
  {path: routeNames.PROFILE_SETTINGS, exact: true, element: <ProfileSettings/>},
  {path: routeNames.SECURITY_SETTINGS, exact: true, element: <SecuritySettings/>},
]
