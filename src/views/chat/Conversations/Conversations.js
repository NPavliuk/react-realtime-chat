import { ConversationsBar } from '@components/sidebars'

export const Conversations = ({children}) => {
  return (
    <div>
      <div>
        <ConversationsBar/>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
