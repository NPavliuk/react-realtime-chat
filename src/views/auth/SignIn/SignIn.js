import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { SignInForm } from '@components/forms'
import { routeNames } from '@constants/routeNames'
import styles from './SignIn.module.scss'

export const SignIn = () => {
  const data = {
    title: 'Chat - Sign in',
    logo: {
      alt: 'some text',
      src: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
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
            <p className={styles.subTitle}>Or{' '}<Link to={routeNames.SIGN_UP} className={styles.subTitleLink}>create new account</Link></p>
          </div>
          <SignInForm/>
        </div>
      </div>
    </div>
  )
}
