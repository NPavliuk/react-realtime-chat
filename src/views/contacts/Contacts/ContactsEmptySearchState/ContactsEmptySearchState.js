import styles from './ContactsEmptySearchState.module.scss'
import { EmptySearchStateIllustration } from '@components/ui/illustrations/EmptySearchStateIllustration'

export const ContactsEmptySearchState = ({value}) => {
  return (
    <div className={styles.block}>
      <div className={styles.article}>
        <div className={styles.illustration}>
          <EmptySearchStateIllustration/>
        </div>
        <p className={styles.title}>Sorry! No result found :(</p>
        <p className={styles.paragraph}>We didn't find any contact with the name or e-mail "{value}"</p>
      </div>
    </div>
  )
}
