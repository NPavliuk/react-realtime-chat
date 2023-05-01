import styles from './ConversationMessageReply.module.scss'
import { classNames } from '@helpers/classNames'
import { getInterlocutor } from '@helpers/getInterlocutor'

export const ConversationMessageReply = ({conversation, message, modifyClass}) => {
	let interlocutor = getInterlocutor(conversation, message)

	return (
		<div className={classNames({
			[styles.message]: true,
			[styles.incoming]: modifyClass === 'incoming'
		})}>
			<span className={styles.name}>{interlocutor ? interlocutor.name : ''}</span>
			<blockquote className={styles.text} dangerouslySetInnerHTML={{__html:message.replyMessage.text}}></blockquote>
		</div>
	)
}
