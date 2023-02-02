import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { NotFoundIllustration } from '@components/ui/illustrations/NotFoundIllustration'
import { routeNames } from '@constants/routeNames'
import styles from './NotFound.module.scss'

export const NotFound = () => {
  const data = {
    title: 'Chat - Page Not Found'
  }

  return (
    <div>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.article}>
            <div className={styles.illustration}>
              <NotFoundIllustration/>
            </div>
            <p className={styles.title}>Sorry, we couldn't find this page.</p>
            <p className={styles.paragraph}>But dont worry, you can find plenty of other things on our homepage.</p>
            <Link to={routeNames.HOME} className={styles.button}>Back to homepage</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
