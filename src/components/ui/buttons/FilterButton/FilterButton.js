import styles from './FilterButton.module.scss'

export const FilterButton = ({name, title, id, handler, checked}) => {
	return (
		<label className={styles.button} htmlFor={id}>
			<input id={id} name={name} type="radio" onChange={handler} checked={checked}/>
			<span className={styles.buttonName}>{title}</span>
		</label>
	)
}
