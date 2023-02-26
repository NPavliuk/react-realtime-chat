import { Toaster } from 'react-hot-toast'

export const ToasterNotification = () => {
  return (
    <Toaster position="top-center"
             toastOptions={{
               style: {
                 maxWidth: '800px'
               }
             }}/>
  )
}
