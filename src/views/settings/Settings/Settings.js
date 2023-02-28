import { Helmet } from 'react-helmet'
import { SettingsBar } from '@components/sidebars'
import styles from './Settings.module.scss'

export const Settings = ({children}) => {
  const data = {
    title: 'Chat - Settings'
  }

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={styles.wrapper}>
        <SettingsBar />
        {children}
      </div>
    </>
  )
}
