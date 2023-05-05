import styles from './PrimaryModal.module.scss'
import { useEffect, useRef } from 'react'

export const PrimaryModal = ({children, isOpen, closeHandler}) => {
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
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
