import styles from './PrimaryDropdown.module.scss'
import { useEffect, useRef, useState } from 'react'
import { classNames } from '@helpers/classNames'

export const PrimaryDropdown = ({children, icon}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef()

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
				toggleOpenHandler()
			}
		}
		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isOpen])

	const toggleOpenHandler = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.wrapper}>
			<button className={styles.button} onClick={toggleOpenHandler}>
				{icon}
			</button>
			<div className={classNames({
				[styles.menu]: true,
				[styles.show]: isOpen,
			})} ref={menuRef}>
				<ul className={styles.list} onClick={toggleOpenHandler}>
					{children}
				</ul>
			</div>
		</div>
	)
}
