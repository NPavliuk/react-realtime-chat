import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'

export const AppRouter = () => {
  const auth = false

  return (
    auth ?
      <Routes>
        {privateRoutes.map((route, i) =>
          <Route key={i} path={route.path} element={route.element}/>
        )}
      </Routes>
      :
      <Routes>
        {publicRoutes.map((route, i) =>
          <Route key={i} path={route.path} element={route.element}/>
        )}
      </Routes>

  )
}
