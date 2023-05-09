import styles from './Settings.module.scss'
import { Helmet } from 'react-helmet'
import { SettingsBar } from './SettingsBar/SettingsBar'

const data = {
	title: 'Chat - Settings'
}

export const Settings = ({children}) => {
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
