import styles from './ProfileBar.module.scss'
import Moment from 'react-moment'
import { classNames } from '@helpers/classNames'
import { useDispatch, useSelector } from 'react-redux'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'
import { RiCloseFill, RiMailLine, RiPhoneLine } from 'react-icons/ri'
import { FaBirthdayCake } from 'react-icons/fa'
import { UserAvatar } from '@components/ui/avatars'
import { CancelButton, PrimaryButton } from '@components/ui/buttons'
import { checkIsContact } from '@helpers/checkContact'
import { addContactStart, removeContactStart } from '@store/reducers/contactsReducer/contactsActions'
import { routeNames } from '@constants/routeNames'

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
      contactUserID: profile
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
        {
          profile.role ?
            <p className={styles.description}>{profile.role}</p>
            : null
        }
      </div>

      {
        userId !== profile.uid ?
          <div className={styles.controls}>
            <PrimaryButton title={'Message'}/>
            {
              isContact ?
                <CancelButton title={'Remove'} handler={removeContactHandler}/>
                : <PrimaryButton title={'Add to Contact'} handler={addContactHandler}/>
            }
          </div>
          :
          <div className={styles.controls}>
            <PrimaryButton link={routeNames.PROFILE_SETTINGS} title={'Edit Profile'}/>
          </div>
      }


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
                    <RiPhoneLine/>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.label}>Phone</p>
                    <a className={styles.link} href={`tel:${profile.phone}`}>{profile.phone}</a>
                  </div>
                </div> : null
            }
          </div> : null
      }

      {
        profile.bio || profile.birthday ?
          <div className={styles.contacts}>
            <h5 className={styles.title}>About me</h5>

            {
              profile.birthday ?
                <div className={styles.item}>
                  <div className={styles.icon}>
                    <FaBirthdayCake/>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.label}>Birth day</p>
                    <p className={styles.text}>
                      <Moment format="DD MMMM YYYY">{profile.birthday}</Moment>
                    </p>
                  </div>
                </div> : null
            }
            {
              profile.bio ?
                <div className={styles.item}>
                  <p className={styles.text}>{profile.bio}</p>
                </div>
                : null
            }
          </div> : null
      }
    </div>
  )
}
