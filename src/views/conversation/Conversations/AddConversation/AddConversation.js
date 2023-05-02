import styles from './AddConversation.module.scss'
import { useState } from 'react'
import { PrimaryButton, TypeButton } from '@components/ui/buttons'
import { AddDirectConversationForm } from '@views/conversation/Conversations/AddConversation/AddDirectConversationForm/AddDirectConversationForm'
import { AddGroupConversationForm, } from '@views/conversation/Conversations/AddConversation/AddGroupConversationForm/AddGroupConversationForm'
import { RiUserLine, RiGroupLine } from 'react-icons/ri'

export const AddConversation = ({closeHandler}) => {
	const [directForm, setDirectForm] = useState(false)
	const [groupForm, setGroupForm] = useState(false)

	const directButtonClickHandler = () => {
		setDirectForm(true)
		setGroupForm(false)
	}

	const groupButtonClickHandler = () => {
		setDirectForm(false)
		setGroupForm(true)
	}

	const closeButtonClickHandler = () => {
		setDirectForm(false)
		setGroupForm(false)
		closeHandler()
	}

	return (
		<div className={styles.wrapper}>
			{
				!directForm && !groupForm ?
					<div className={styles.content}>
						<h3 className={styles.title}>New conversation</h3>
						<p className={styles.note}>Please select the type of conversation you want to create</p>

						<div className={styles.controls}>
							<TypeButton title={'Direct conversation'} icon={<RiUserLine/>} handler={directButtonClickHandler}
													description={'A direct conversation refers to a conversation between two people'}/>
							<TypeButton title={'Group conversation'} icon={<RiGroupLine/>} handler={groupButtonClickHandler}
													description={'Group conversations involve multiple participants'}/>
							<div className={styles.cancel}>
								<PrimaryButton title={'Cancel'} modifyClass={'cancel'} handler={closeButtonClickHandler}/>
							</div>
						</div>
					</div>
					: directForm ?
						<div className={styles.content}>
							<h3 className={styles.title}>New direct conversation</h3>
							<p className={styles.note}>Please select a contact with whom you want to start a conversation</p>
							<AddDirectConversationForm closeHandler={closeButtonClickHandler}/>
						</div>
						: groupForm ?
							<div className={styles.content}>
								<h3 className={styles.title}>New group conversation</h3>
								<p className={styles.note}>Group conversations are best when organized around a topic - rest, for example</p>
								<AddGroupConversationForm closeHandler={closeButtonClickHandler} />
							</div>
							:
							null
			}
		</div>
	)
}
