import { AddContatctsIllustration } from '@components/ui/illustrations/AddContatctsIllustration'
import styles from './ContactsEmptyState.module.scss'

export const ContactsEmptyState = ({handler}) => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.article}>
          <div className={styles.illustration}>
            <AddContatctsIllustration/>
          </div>
          <p className={styles.title}>You don't have any contacts yet.</p>
          <p className={styles.paragraph}>But dont worry, you can add contact using button below.</p>
          <button className={styles.button} onClick={handler}>Add contact</button>
        </div>
      </div>
    </div>
  )
}
