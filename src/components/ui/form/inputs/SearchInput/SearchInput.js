import styles from './SearchInput.module.scss'
import { RiSearch2Line } from 'react-icons/ri'

export const SearchInput = ({id, placeholder, handler, value}) => {
  return (
    <div className={styles.search}>
      <div className={styles.icon}>
        <RiSearch2Line/>
      </div>
      <input id={id}
             type="text"
             placeholder={placeholder}
             onInput={handler ? handler : null}
             value={value ? value : ''}/>
    </div>
  )
}
