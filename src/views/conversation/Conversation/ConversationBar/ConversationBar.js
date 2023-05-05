import styles from './ConversationBar.module.scss'
import { RiCloseFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { UserAvatar } from '@components/ui/avatars'
import { PrimaryButton } from '@components/ui/buttons'
import {
	closeConversationBar,
	openAddInterlocutorModal, openEditConversationModal
} from '@store/reducers/conversationReducer/conversationActions'
import { closeProfileBar } from '@store/reducers/profileReducer/profileActions'
import {
	ConversationMember
} from '@views/conversation/Conversation/ConversationBar/ConversationMember/ConversationMember'
import { classNames } from '@helpers/classNames'

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

	const openEditConversationModalHandler = () => {
		dispatch(openEditConversationModal())
	}

	return (
		<div className={classNames({
			[styles.wrapper]: true,
			[styles.active]: conversation.sidebar
		})}>
			<div className={styles.header}>
				<h3 className={styles.title}>Conversation</h3>
				<button className={styles.button}
								onClick={closeSidebarHandler}
				>
					<RiCloseFill/>
				</button>
			</div>

			<div>
				<div className={styles.avatar}>
					<UserAvatar name={conversation.data.name}
											image={conversation.data.avatar ? conversation.data.avatar : ''}
											modifyClass={'big'}
					/>
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
					conversation.data.admin === userID ?
						<div className={styles.controls}>
							<PrimaryButton title={'Edit Conversation'}
														 handler={openEditConversationModalHandler}
							/>
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
									<ConversationMember key={interlocutor.id}
																			interlocutor={interlocutor}
																			conversation={conversation}
									/>)
							}
							{
								conversation.data.admin === userID ?
									<div className={styles.controls}>
										<PrimaryButton title={'Add People'}
																	 handler={openAddInterlocutorModalHandler}
										/>
									</div>
									: null
							}
						</div>
						: null
				}
			</div>


		</div>
	)
}
