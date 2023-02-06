import { Helmet } from 'react-helmet'
import styles from './PrivateLayout.module.scss'

export const PrivateLayout = ({children}) => {
  const appTitle = 'Chat'

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <div className={styles.page}>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </>
  )
}
