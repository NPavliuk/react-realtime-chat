import styles from './ConversationHead.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserAvatar } from '@components/ui/avatars'
import { clearMessagesStart } from '@store/reducers/messagesReducer/messagesActions'
import {
	leaveConversationStart,
	openConversationBar,
	removeConversationStart, removeInterlocutorStart
} from '@store/reducers/conversationReducer/conversationActions'
import {
	closeProfileBar,
	getProfileInfoStart,
	openProfileBar
} from '@store/reducers/profileReducer/profileActions'
import { PrimaryDropdown, PrimaryDropdownItem } from '@components/ui/dropdowns'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { RiDeleteBin7Line, RiUserLine } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import { RxExit } from 'react-icons/rx'
import { GrClearOption } from 'react-icons/gr'

export const ConversationHead = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userID = useSelector(state => state.auth.id)
	const conversation = useSelector(state => state.conversation)

	let interlocutor
	if (conversation.data.conversationalists) {
		conversation.data.conversationalists.map(i => i.id !== userID ? interlocutor = i : null)
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
					<UserAvatar name={interlocutor ? interlocutor.name : ''} image={interlocutor ? interlocutor.avatar : ''}
											handler={openProfileBarHandler}/>
					<div className={styles.userDetails}>
						<h3 className={styles.userName}>{interlocutor ? interlocutor.name : ''}</h3>
						<p className={styles.userPosition}>Web dev</p>
					</div>
				</div>
				<PrimaryDropdown icon={<HiOutlineDotsVertical/>}>
					<PrimaryDropdownItem icon={<RiUserLine/>} title={'View details'} handler={openProfileBarHandler}/>
					<PrimaryDropdownItem icon={<GrClearOption/>} title={'Clear history'} handler={clearConversationMessages}/>
					<PrimaryDropdownItem icon={<RiDeleteBin7Line/>} title={'Remove conversation'} modifyClass={'danger'} handler={removeConversationHandler}/>
				</PrimaryDropdown>
			</div>
			:
			<div className={styles.wrapper}>
				<div className={styles.user}>
					<UserAvatar name={conversation.data.name ? conversation.data.name : ''}
											image={conversation.data.avatar ? conversation.data.avatar : ''}
											handler={openConversationBarHandler}/>
					<div className={styles.userDetails}>
						<h3 className={styles.userName}>{conversation.data.name ? conversation.data.name : ''}</h3>
						<p className={styles.userPosition}>{conversation.data.description ? conversation.data.description : ''}</p>
					</div>
				</div>
				<PrimaryDropdown icon={<HiOutlineDotsVertical/>}>
					<PrimaryDropdownItem icon={<FiUsers/>} title={'View details'} handler={openConversationBarHandler}/>
					{
						conversation.data && userID === conversation.data.admin
							? <PrimaryDropdownItem icon={<GrClearOption/>} title={'Clear history'} handler={clearConversationMessages}/>
							: null
					}
					{
						conversation.data && userID === conversation.data.admin
							? <PrimaryDropdownItem icon={<RiDeleteBin7Line/>} title={'Remove conversation'} modifyClass={'danger'} handler={removeConversationHandler}/>
							: <PrimaryDropdownItem icon={<RxExit/>} title={'Leave conversation'} modifyClass={'danger'} handler={leaveConversationHandler}/>
					}
				</PrimaryDropdown>
			</div>
	)
}
