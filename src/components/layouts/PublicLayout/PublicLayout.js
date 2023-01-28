import { Helmet } from 'react-helmet'

export const PublicLayout = ({children}) => {
  const appTitle = 'Chat'

  return (
    <>
      <Helmet>
        <title>{appTitle}</title>
      </Helmet>
      <main>
        {children}
      </main>
      <footer></footer>
    </>
  )
}
