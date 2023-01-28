import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from '@components/routers/PublicRouter/publicRoutes'

export const PublicRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route, i) =>
        <Route key={i} path={route.path} element={route.element}/>
      )}
    </Routes>
  )
}
