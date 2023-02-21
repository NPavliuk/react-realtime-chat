import { routeNames } from '@constants/routeNames'
import { NotFound } from '@views/error/NotFound/NotFound'
import { Contacts } from '@views/contacts/Contacts/Contacts'
import { Conversation } from '@views/chat/Conversation/Conversation'
import { Conversations } from '@views/chat/Conversations/Conversations'

export const privateRoutes = [
  {path: routeNames.ANY, exact: true, element: <NotFound/>},
  {path: routeNames.CONTACTS, exact: true, element: <Contacts/>},
  {path: routeNames.CONVERSATION, exact: true, element: <Conversation/>},
  {path: routeNames.CONVERSATIONS, exact: true, element: <Conversations/>},
]
