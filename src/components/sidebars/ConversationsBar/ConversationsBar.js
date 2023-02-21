import { useState } from 'react'

export const ConversationsBar = () => {
  const [chooseModalOpen, setChooseModalOpen] = useState(false)
  const [privateModalOpen, setPrivateModalOpen] = useState(false)

  const openChooseModal = () => {
    setChooseModalOpen(true)
    setPrivateModalOpen(false)
  }

  const openPrivateModal = () => {
    setChooseModalOpen(false)
    setPrivateModalOpen(true)
  }

  return (
    <div>
      <button onClick={openChooseModal}>add conversation</button>

      {chooseModalOpen ? <div>
        <button className={'mr-3'} onClick={openPrivateModal}>private conversation</button>
        <button>group conversation</button>
      </div> : null}

      {privateModalOpen ? <div>
        Private conversation
      </div> : null}
    </div>
  )
}
