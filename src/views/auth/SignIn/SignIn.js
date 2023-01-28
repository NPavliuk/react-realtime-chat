import { Helmet } from 'react-helmet'

export const SignIn = () => {
  const pageTitle = 'Chat - Sign in'

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}
