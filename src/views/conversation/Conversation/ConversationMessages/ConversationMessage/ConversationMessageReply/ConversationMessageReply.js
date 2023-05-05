import styles from './ConversationMessageReply.module.scss'
import { classNames } from '@helpers/classNames'
import { getInterlocutorData } from '@helpers/getInterlocutorData'

export const ConversationMessageReply = ({conversation, message, modifyClass}) => {
	let interlocutor = getInterlocutorData(conversation, message)

	return (
		<article className={classNames({
			[styles.message]: true,
			[styles.incoming]: modifyClass === 'incoming'
		})}>
			<h5 className={styles.name}>{interlocutor ? interlocutor.name : ''}</h5>
			<blockquote className={styles.text}
									dangerouslySetInnerHTML={{__html:message.replyMessage.text}}
			></blockquote>
		</article>
	)
}
