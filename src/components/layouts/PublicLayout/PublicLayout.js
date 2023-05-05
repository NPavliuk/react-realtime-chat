import styles from './PublicLayout.module.scss'
import { Helmet } from 'react-helmet'
import { SmallFooter } from '@components/footers'
import { ToasterNotification } from '@components/ui/notifications'

export const PublicLayout = ({children}) => {
  const appTitle = 'Chat'

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <ToasterNotification />
      <div className={styles.page}>
        <main className={styles.content}>
          {children}
        </main>
        <SmallFooter />
      </div>
    </>
  )
}
