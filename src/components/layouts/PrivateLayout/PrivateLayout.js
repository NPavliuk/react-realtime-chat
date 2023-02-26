import { Helmet } from 'react-helmet'
import { ProfileBar, NavigationBar } from '@components/sidebars'
import { ToasterNotification } from '@components/ui/notifications'
import styles from './PrivateLayout.module.scss'

export const PrivateLayout = ({children}) => {
  const appTitle = 'Chat'

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <ToasterNotification />
      <div className={styles.page}>
        <NavigationBar/>
        <main className={styles.inner}>
          <div className={styles.content}>
            {children}
          </div>
          <ProfileBar/>
        </main>
      </div>
    </>
  )
}
