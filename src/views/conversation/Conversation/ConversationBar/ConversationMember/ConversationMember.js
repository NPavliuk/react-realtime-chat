import styles from './ConversationMember.module.scss'
import { UserAvatar } from '@components/ui/avatars'
import { MessageControlButton } from '@components/ui/buttons'
import { RiDeleteBin7Line, RiAdminLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { removeInterlocutorStart } from '@store/reducers/conversationReducer/conversationActions'

export const ConversationMember = ({interlocutor, conversation}) => {
	const dispatch = useDispatch()
	const userID = useSelector(state => state.auth.id)

	const removeConversationMember = () => {
		const data = {
			userID: interlocutor.id,
			conversationID: conversation.id
		}

		dispatch(removeInterlocutorStart(data))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<UserAvatar name={interlocutor.name} image={interlocutor.avatar ? interlocutor.avatar : ''} modifyClass={'small'}/>
				<div className={styles.info}>
					<h5 className={styles.name}>{interlocutor.name}</h5>
					<h5 className={styles.email}>{interlocutor.email}</h5>
				</div>
				{
					interlocutor.id === userID
						?	<div className={styles.admin}><RiAdminLine /></div>
						:	null
				}
				<div className={styles.control}>
					{
						interlocutor.id !== userID
							? <MessageControlButton icon={<RiDeleteBin7Line />} handler={removeConversationMember} modifyClass={'danger'} />
							:	null
					}
				</div>
			</div>
		</div>
	)
}
