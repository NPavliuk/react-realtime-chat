import styles from './ConversationHead.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserAvatar } from '@components/ui/avatars'
import { PrimaryDropdown, PrimaryDropdownItem } from '@components/ui/dropdowns'
import { FiUsers } from 'react-icons/fi'
import { BiExit } from 'react-icons/bi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { RiDeleteBin7Line, RiUserLine } from 'react-icons/ri'
import { GrClearOption, GrFormPrevious } from 'react-icons/gr'
import {
	leaveConversationStart,
	openConversationBar,
	removeConversationStart
} from '@store/reducers/conversationReducer/conversationActions'
import {
	closeProfileBar,
	getProfileInfoStart,
	openProfileBar
} from '@store/reducers/profileReducer/profileActions'
import { clearMessagesStart } from '@store/reducers/messagesReducer/messagesActions'
import { checkUserStatus } from '@helpers/checkUserStatus'
import { getInterlocutorData } from '@helpers/getInterlocutorData'
import { checkIfTablet } from '@helpers/checkResolution'
import { routeNames } from '@constants/routeNames'

export const ConversationHead = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userID = useSelector(state => state.auth.id)
	const conversation = useSelector(state => state.conversation)
	const onlineUsers = useSelector(state => state.users.onlineUsers)
	let interlocutor = getInterlocutorData(conversation, userID)
	const isTablet = checkIfTablet()

	let userStatus
	if (interlocutor) {
		userStatus = checkUserStatus(interlocutor.id, onlineUsers)
	}

	const openProfileBarHandler = () => {
		if (interlocutor) {
			dispatch(openProfileBar())
			dispatch(getProfileInfoStart(interlocutor.id))
		}
	}

	const openConversationBarHandler = () => {
		dispatch(closeProfileBar())
		dispatch(openConversationBar())
	}

	const leaveConversationHandler = () => {
		const data = {
			userID: userID,
			conversationID: conversation.id,
			navigate: navigate
		}
		dispatch(leaveConversationStart(data))
	}

	const removeConversationHandler = (e) => {
		e.preventDefault()
		const data = {
			userID: userID,
			conversationID: conversation.id,
			conversationalists: conversation.data.conversationalists,
			navigate: navigate
		}
		dispatch(removeConversationStart(data))
	}

	const clearConversationMessages = () => {
		dispatch(clearMessagesStart(conversation.id))
	}

	return (
		conversation.data.directConversation ?
			<div className={styles.wrapper}>
				<div className={styles.user}>
					{
						isTablet ?
							<Link className={styles.backButton}
										to={routeNames.CONVERSATIONS}
							>
								<GrFormPrevious/>
							</Link>
							: null
					}
					<UserAvatar name={interlocutor ? interlocutor.name : ''}
											image={interlocutor ? interlocutor.avatar : ''}
											handler={openProfileBarHandler}
					/>
					<div className={styles.userDetails}>
						<h3 className={styles.userName}>{interlocutor ? interlocutor.name : ''}</h3>
						<p className={styles.userPosition}>{userStatus ? 'online' : 'offline'}</p>
					</div>
				</div>
				<PrimaryDropdown icon={<HiOutlineDotsVertical/>}>
					<PrimaryDropdownItem icon={<RiUserLine/>}
															 title={'View details'}
															 handler={openProfileBarHandler}
					/>
					<PrimaryDropdownItem icon={<GrClearOption/>}
															 title={'Clear history'}
															 handler={clearConversationMessages}
					/>
					<PrimaryDropdownItem icon={<RiDeleteBin7Line/>}
															 title={'Remove conversation'}
															 modifyClass={'danger'}
															 handler={removeConversationHandler}
					/>
				</PrimaryDropdown>
			</div>
			:
			<div className={styles.wrapper}>
				<div className={styles.user}>
					{
						isTablet ?
							<Link className={styles.backButton}
										to={routeNames.CONVERSATIONS}
							>
								<GrFormPrevious/>
							</Link>
							: null
					}
					<UserAvatar name={conversation.data.name ? conversation.data.name : ''}
											image={conversation.data.avatar ? conversation.data.avatar : ''}
											handler={openConversationBarHandler}
					/>
					<div className={styles.userDetails}>
						<h3 className={styles.userName}>{conversation.data.name ? conversation.data.name : ''}</h3>
						<p className={styles.userPosition}>{conversation.data.description ? conversation.data.description : ''}</p>
					</div>
				</div>
				<PrimaryDropdown icon={<HiOutlineDotsVertical/>}>
					<PrimaryDropdownItem icon={<FiUsers/>}
															 title={'View details'}
															 handler={openConversationBarHandler}
					/>
					{
						conversation.data && userID === conversation.data.admin
							?
							<PrimaryDropdownItem icon={<GrClearOption/>}
																	 title={'Clear history'}
																	 handler={clearConversationMessages}
							/>
							: null
					}
					{
						conversation.data && userID === conversation.data.admin
							? <PrimaryDropdownItem icon={<RiDeleteBin7Line/>}
																		 title={'Remove conversation'}
																		 modifyClass={'danger'}
																		 handler={removeConversationHandler}
							/>
							: <PrimaryDropdownItem icon={<BiExit/>}
																		 title={'Leave conversation'}
																		 modifyClass={'danger'}
																		 handler={leaveConversationHandler}
							/>
					}
				</PrimaryDropdown>
			</div>
	)
}
