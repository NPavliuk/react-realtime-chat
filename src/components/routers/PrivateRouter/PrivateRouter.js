import { Route, Routes } from 'react-router-dom'
import { privateRoutes } from '@components/routers/PrivateRouter/privateRoutes'

export const PrivateRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route, i) =>
        <Route key={i} path={route.path} element={route.element}/>
      )}
    </Routes>
  )
}
