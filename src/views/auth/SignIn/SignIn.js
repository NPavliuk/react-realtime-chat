import { Helmet } from 'react-helmet'

export const SignIn = () => {
  const pageTitle = 'Chat - Sign in'

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      SignIn
    </div>
  )
}
