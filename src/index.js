import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import '@styles/index.scss'
import App from '@views/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
      <Toaster/>
    </BrowserRouter>
  </Provider>
)
