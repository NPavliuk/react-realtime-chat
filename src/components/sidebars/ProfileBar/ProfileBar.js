import styles from './ProfileBar.module.scss'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatar } from '@components/ui/avatars'
import { PrimaryButton } from '@components/ui/buttons'
import { RiCloseFill, RiMailLine, RiPhoneLine } from 'react-icons/ri'
import { FaBirthdayCake } from 'react-icons/fa'
import { routeNames } from '@constants/routeNames'
import { classNames } from '@helpers/classNames'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'
import { createDirectConversationStart } from '@store/reducers/conversationReducer/conversationActions'
import { useNavigate } from 'react-router-dom'

export const ProfileBar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const profile = useSelector(state => state.profile.data)
	const isOpen = useSelector(state => state.profile.sidebar)

	const closeHandler = () => {
		dispatch(closeProfileBar())
	}

	const messageClickHandler = () => {
		const data = {
			userID: userID,
			interlocutorID: profile.id,
			navigate: navigate
		}
		dispatch(createDirectConversationStart(data))
	}

	return (
		<div className={classNames({
			[styles.wrapper]: true,
			[styles.active]: isOpen
		})}>
			<div className={styles.header}>
				<h3 className={styles.title}>Profile</h3>
				<button className={styles.button} onClick={closeHandler}>
					<RiCloseFill/>
				</button>
			</div>

			<div>
				<div className={styles.avatar}>
					<UserAvatar name={profile.name} image={profile.avatar} modifyClass={'big'}/>
				</div>

				<div className={styles.info}>
					<h4 className={styles.name}>{profile.name}</h4>
					{
						profile.role ?
							<p className={styles.description}>{profile.role}</p>
							: null
					}
				</div>
				{
					userID !== profile.id ?
						<div className={styles.controls}>
							<PrimaryButton handler={messageClickHandler} title={'Message'}/>
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
		</div>
	)
}
