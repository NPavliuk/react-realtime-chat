import { Helmet } from 'react-helmet'
import styles from './PublicLayout.module.scss'

export const PublicLayout = ({children}) => {
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
        <footer className={styles.footer}></footer>
      </div>
    </>
  )
}
