import styles from './SignIn.module.scss'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { SignInForm } from './SignInForm/SignInForm'
import { routeNames } from '@constants/routeNames'
import { links } from '@constants/additionalLinks'

export const SignIn = () => {
  const data = {
    title: 'Conversations - Sign in',
    logo: {
      alt: 'Chat application',
      src: links.project.logoURL
    }
  }

  return (
    <div>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.block}>
          <div>
            <img className={styles.logo} src={data.logo.src} alt={data.logo.alt}/>
            <h2 className={styles.title}>Sign in to your account</h2>
            <p className={styles.subTitle}>Or{' '}<Link to={routeNames.SIGN_UP} className={styles.link}>create
              new account</Link></p>
          </div>
          <SignInForm/>
        </div>
      </div>
    </div>
  )
}
