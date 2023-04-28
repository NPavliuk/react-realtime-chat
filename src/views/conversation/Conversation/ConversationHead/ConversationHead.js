import styles from './ConversationHead.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileInfoStart, openProfileBar } from '@store/reducers/profileReducer/profileActions'
import { PrimaryDropdown, PrimaryDropdownItem } from '@components/ui/dropdowns'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { RiDeleteBin7Line, RiUserLine } from 'react-icons/ri'
import { GrClearOption } from 'react-icons/gr'
import { removeConversationsStart } from '@store/reducers/conversationsReducer/conversationsActions'
import { useNavigate } from 'react-router-dom'
import { clearConversationMessagesStart } from '@store/reducers/conversationReducer/conversationActions'

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

	const removeConversationHandler = (e) => {
		e.preventDefault()

		const data = {
			userID: userID,
			interlocutorID: interlocutor.id,
			conversationID: conversation.id.trim(),
			navigate: navigate
		}

		dispatch(removeConversationsStart(data))
	}

	const clearConversationMessages = () => {
		dispatch(clearConversationMessagesStart(conversation.id))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.user}>
				<UserAvatar name={interlocutor ? interlocutor.name : ''}
										image={interlocutor ? interlocutor.avatar : ''}
										handler={openProfileBarHandler}/>
				<div className={styles.userDetails}>
					<h3 className={styles.userName}>{interlocutor ? interlocutor.name : ''}</h3>
					<p className={styles.userPosition}>Web dev</p>
				</div>
			</div>
			{
				conversation.data.directConversation ?
					<PrimaryDropdown icon={<HiOutlineDotsVertical/>}>
						<PrimaryDropdownItem icon={<RiUserLine/>} title={'Profile'} handler={openProfileBarHandler}/>
						<PrimaryDropdownItem icon={<GrClearOption/>} title={'Clear history'} handler={clearConversationMessages}/>
						<PrimaryDropdownItem icon={<RiDeleteBin7Line/>} title={'Remove conversation'} modifyClass={'danger'} handler={removeConversationHandler}/>
					</PrimaryDropdown>
					: null
			}
		</div>
	)
}
