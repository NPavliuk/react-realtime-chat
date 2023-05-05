import styles from './SmallFooter.module.scss'
import { Link } from 'react-router-dom'
import { links } from '@constants/additionalLinks'

export const SmallFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© {currentYear} <Link to={links.personal.linkedIn} className={styles.link}>Nazarii Pavliuk</Link>. All Rights Reserved</p>
    </footer>
  )
}
