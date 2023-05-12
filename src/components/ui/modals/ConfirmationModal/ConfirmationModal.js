import styles from './ConfirmationModal.module.scss'
import { useEffect, useRef } from 'react'
import { PrimaryButton } from '@components/ui/buttons'

export const ConfirmationModal = ({closeHandler, submitHandler, isOpen, title, description, submitButtonTitle}) => {
	const modalRef = useRef()

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
				closeHandler()
			}
		}
		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isOpen])

	return (
		<div className={styles.popup}>
			<div className={styles.popupInner}>
				<div className={styles.modal} ref={modalRef}>
					<div className={styles.modalInner}>
						<div className={styles.content}>
							<h3 className={styles.title}>{title}</h3>
							<p className={styles.note}>{description}</p>

							<div className={styles.controls}>
								<PrimaryButton title={'Cancel'}
															 modifyClass={'cancel'}
															 handler={closeHandler}
								/>
								<PrimaryButton title={submitButtonTitle ? submitButtonTitle : 'submit'}
															 handler={submitHandler}
															 modifyClass={'danger'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
