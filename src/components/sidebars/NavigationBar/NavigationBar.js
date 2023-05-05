import styles from './NavigationBar.module.scss'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatar } from '@components/ui/avatars'
import { NavigationButton, LogoutButton } from '@components/ui/buttons'
import { closeProfileBar, getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { closeConversationBar } from '@store/reducers/conversationReducer/conversationActions'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { RiDiscussLine, RiDiscussFill, RiSettings4Line, RiSettings4Fill } from 'react-icons/ri'
import { isUnreadConversations } from '@helpers/messages'
import { checkUserStatus } from '@helpers/checkUserStatus'
import { checkIfMobile, checkIfTablet } from '@helpers/checkResolution'
import { classNames } from '@helpers/classNames'
import { routeNames } from '@constants/routeNames'

export const NavigationBar = () => {
	const dispatch = useDispatch()
	const navBarRef = useRef()
	const [open, setOpen] = useState(false)
	const user = useSelector(state => state.user.data)
	const onlineUsers = useSelector(state => state.users.onlineUsers)
	const conversationID = useSelector(state => state.conversation.id)
	const conversations = useSelector(state => state.conversations.conversations)
	const isMobile = checkIfMobile()
	const isTablet = checkIfTablet()

	let isUnread
	let userStatus
	if (user) {
		userStatus = checkUserStatus(user.id, onlineUsers)
		isUnread = isUnreadConversations(conversations, user.id)
	}

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (open && navBarRef.current && !navBarRef.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', checkIfClickedOutside)
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [open])

	const toggleNavigationBarHandler = () => {
		setOpen(!open)
	}

	const openProfileBarHandler = () => {
		dispatch(openProfileBar())
		dispatch(closeConversationBar())
		dispatch(getProfileInfoStart(user.id))
	}

	const closeProfileBarHandler = () => {
		if (isMobile) {
			dispatch(closeProfileBar())
		}
		dispatch(closeConversationBar())
	}

	return (
		<aside>
			<div className={classNames({
				[styles.sidebar]: true,
				[styles.open]: open
			})} ref={navBarRef}>
				<div className={styles.button} onClick={toggleNavigationBarHandler}>
					{open ? <GrFormPrevious/> : <GrFormNext/>}
				</div>
				<div className={styles.item}>
					<UserAvatar name={user.name}
											image={user.avatar}
											status={userStatus}
											handler={() => {
												toggleNavigationBarHandler()
												openProfileBarHandler()
											}}/>
				</div>
				<div className={styles.nav}>
					<div className={styles.item}>
						<NavigationButton route={conversationID && !isTablet ? `${routeNames.CONVERSATIONS}/${conversationID}` : routeNames.CONVERSATIONS}
															icon={<RiDiscussLine/>}
															activeIcon={<RiDiscussFill/>}
															indicator={isUnread}
															handler={() => {
																toggleNavigationBarHandler()
																closeProfileBarHandler()
															}}/>
					</div>
				</div>
				<div>
					<div className={styles.item}>
						<NavigationButton route={isMobile ? routeNames.SETTINGS : routeNames.PROFILE_SETTINGS}
															icon={<RiSettings4Line/>}
															activeIcon={<RiSettings4Fill/>}
															indicator={false}
															handler={() => {
																toggleNavigationBarHandler()
																closeProfileBarHandler()
															}}/>
					</div>
					<div className={styles.item}>
						<LogoutButton/>
					</div>
				</div>
			</div>
		</aside>
	)
}
