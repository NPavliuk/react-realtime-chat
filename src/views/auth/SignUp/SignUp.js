import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { SignUpForm } from './SignUpForm/SignUpForm'
import { routeNames } from '@constants/routeNames'
import styles from '@views/auth/SignIn/SignIn.module.scss'

export const SignUp = () => {
  const data = {
    title: 'Conversations - Sign Up',
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
            <h2 className={styles.title}>Create a new account</h2>
            <p className={styles.subTitle}>Or{' '}<Link to={routeNames.SIGN_IN} className={styles.subTitleLink}>sign in to already existed account</Link></p>
          </div>
          <SignUpForm/>
        </div>
      </div>
    </div>
  )
}
