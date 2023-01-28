import { PrivateLayout, PublicLayout } from '@components/layouts'
import { PrivateRouter, PublicRouter } from '@components/routers'

function App() {
  const user = false

  return (
    user ?
      <>
        <PrivateRouter/>
        <PrivateLayout/>
      </>
      :
      <>
        <PublicRouter/>
        <PublicLayout/>
      </>
  )
}

export default App
