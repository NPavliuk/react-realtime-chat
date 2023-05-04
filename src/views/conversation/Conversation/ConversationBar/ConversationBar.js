import styles from './ConversationBar.module.scss'
import { classNames } from '@helpers/classNames'
import { RiCloseFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatar } from '@components/ui/avatars'
import { PrimaryButton } from '@components/ui/buttons'
import { ConversationMember } from '@views/conversation/Conversation/ConversationBar/ConversationMember/ConversationMember'
import {
	closeAddInterlocutorModal,
	closeConversationBar, closeEditConversationModal,
	openAddInterlocutorModal, openEditConversationModal
} from '@store/reducers/conversationReducer/conversationActions'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'
import { PrimaryModal } from '@components/ui/modals'
import { AddInterlocutor } from '@views/conversation/Conversation/AddInterlocutor/AddInterlocutor'
import { ConversationEdit } from '@views/conversation/Conversation/ConversationEdit/ConversationEdit'

export const ConversationBar = () => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)
	const conversation = useSelector(state => state.conversation)

	const closeSidebarHandler = () => {
		dispatch(closeProfileBar())
		dispatch(closeConversationBar())
	}

	const openAddInterlocutorModalHandler = () => {
		dispatch(openAddInterlocutorModal())
	}

	const closeAddInterlocutorModalHandler = () => {
		dispatch(closeAddInterlocutorModal())
	}

	const openEditConversationModalHandler = () => {
		dispatch(openEditConversationModal())
	}

	const closeEditConversationModalHandler = () => {
		dispatch(closeEditConversationModal())
	}

	return (
		<div className={classNames({
			[styles.wrapper]: true,
			[styles.active]: conversation.sidebar
		})}>
			<div className={styles.header}>
				<h3 className={styles.title}>Conversation</h3>
				<button className={styles.button} onClick={closeSidebarHandler}>
					<RiCloseFill/>
				</button>
			</div>

			<div>
				<div className={styles.avatar}>
					<UserAvatar name={conversation.data.name} image={conversation.data.avatar ? conversation.data.avatar : ''} modifyClass={'big'}/>
				</div>
				<div className={styles.info}>
					<h4 className={styles.name}>{conversation.data.name}</h4>
					{
						conversation.data.description ?
							<p className={styles.description}>{conversation.data.description}</p>
							: null
					}
				</div>
				{
					conversation.data.admin === userID   ?
						<div className={styles.controls}>
							<PrimaryButton title={'Edit Conversation'} handler={openEditConversationModalHandler} />
						</div>
						:
						<div className={styles.controls}>
							<PrimaryButton title={'Message'}/>
						</div>
				}
				{
					conversation.data.conversationalists ?
						<div className={styles.contacts}>
							<h5 className={styles.title}>Members</h5>
							{
								conversation.data.conversationalists.map(interlocutor =>
									<ConversationMember key={interlocutor.id} interlocutor={interlocutor} conversation={conversation} />)
							}
							{
								conversation.data.admin === userID ?
									<div className={styles.controls}>
										<PrimaryButton handler={openAddInterlocutorModalHandler} title={'Add People'}/>
									</div>
									: null
							}
						</div>
						: null
				}
			</div>

			{
				conversation.addModal ?
					<PrimaryModal isOpen={conversation.addModal} closeHandler={closeAddInterlocutorModalHandler}>
						<AddInterlocutor closeHandler={closeAddInterlocutorModalHandler}/>
					</PrimaryModal>
					:
					null
			}
			{
				conversation.editModal ?
					<PrimaryModal isOpen={conversation.editModal} closeHandler={closeEditConversationModalHandler}>
						<ConversationEdit closeHandler={closeEditConversationModalHandler}/>
					</PrimaryModal>
					:
					null
			}
		</div>
	)
}
