import styles from './SearchInput.module.scss'
import { RiSearch2Line } from 'react-icons/ri'

export const SearchInput = ({id, placeholder}) => {
  return (
    <div className={styles.search}>
      <div className={styles.icon}>
        <RiSearch2Line />
      </div>
      <input type="text" id={id} placeholder={placeholder}/>
    </div>
  )
}
