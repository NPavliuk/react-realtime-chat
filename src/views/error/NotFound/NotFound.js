import styles from './NotFound.module.scss'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NotFoundIllustration } from '@components/ui/illustrations/NotFoundIllustration'
import { routeNames } from '@constants/routeNames'

const data = {
	title: 'Conversations - Page Not Found'
}

export const NotFound = () => {
	const userID = useSelector(state => state.auth.id)

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
						{
							userID
								? <Link to={routeNames.CONVERSATIONS} className={styles.button}>Back to homepage</Link>
								: <Link to={routeNames.HOME} className={styles.button}>Back to homepage</Link>
						}
          </div>
        </div>
      </div>
    </div>
  )
}
