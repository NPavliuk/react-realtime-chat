import { Helmet } from 'react-helmet'
import { InfoBar, NavBar } from '@components/sidebars'
import styles from './PrivateLayout.module.scss'

export const PrivateLayout = ({children}) => {
  const appTitle = 'Chat'

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <div className={styles.page}>
        <NavBar/>
        <main className={styles.content}>
          {children}
        </main>
        <InfoBar/>
      </div>
    </>
  )
}
