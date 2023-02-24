import styles from './ProfileBar.module.scss'
import { classNames } from '@helpers/classNames'
import { useDispatch, useSelector } from 'react-redux'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'
import { RiCloseFill, RiMailLine } from 'react-icons/ri'
import { UserAvatar } from '@components/ui/avatars'
import { CancelButton, PrimaryButton } from '@components/ui/buttons'
import { checkIsContact } from '@helpers/checkContact'
import { addContactStart, removeContactStart } from '@store/reducers/contactsReducer/contactsActions'

export const ProfileBar = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.uid)
  const profile = useSelector(state => state.profile.data)
  const contacts = useSelector(state => state.contacts.contacts)
  const isOpen = useSelector(state => state.profile.isOpen)
  const isContact = checkIsContact(profile.uid, contacts)

  const removeContactHandler = () => {
    const data = {
      currentUserID: userId,
      contactUserID: profile.uid
    }
    dispatch(removeContactStart(data))
  }

  const addContactHandler = () => {
    const data = {
      uid: userId,
      email: profile.email
    }
    dispatch(addContactStart(data))
  }

  const closeContactBarHandler = () => {
    dispatch(closeProfileBar())
  }

  return (
    <div className={classNames({
      [styles.wrapper]: true,
      [styles.active]: isOpen
    })}>
      <div className={styles.header}>
        <h3 className={styles.title}>Profile</h3>
        <button className={styles.button} onClick={closeContactBarHandler}>
          <RiCloseFill/>
        </button>
      </div>

      <div className={styles.avatar}>
        <UserAvatar name={profile.displayName} image={profile.avatar} modifyClass={'big'}/>
      </div>

      <div className={styles.info}>
        <h4 className={styles.name}>{profile.displayName}</h4>
        <p className={styles.description}>Junior front-end developer</p>
      </div>

      <div className={styles.controls}>
        <PrimaryButton title={'Message'}/>
        {
          isContact ?
            <CancelButton title={'Remove'} handler={removeContactHandler}/>
            : <PrimaryButton title={'Add to Contact'} handler={addContactHandler}/>
        }
      </div>

      {
        profile.email || profile.phone ?
          <div className={styles.contacts}>
            <h5 className={styles.title}>Contact information</h5>

            {
              profile.email ?
                <div className={styles.item}>
                  <div className={styles.icon}>
                    <RiMailLine/>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.label}>Email Address</p>
                    <a className={styles.link} href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                </div>
                : null
            }

            {
              profile.phone ?
                <div className={styles.item}>
                  <div className={styles.icon}>
                    <RiMailLine/>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.label}>Phone</p>
                    <a className={styles.link} href={`tel:${profile.phone}`}>{profile.phone}</a>
                  </div>
                </div> : null
            }
          </div> : null
      }
    </div>
  )
}
