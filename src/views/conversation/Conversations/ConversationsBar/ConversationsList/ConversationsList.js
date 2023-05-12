import styles from './ConversationsList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FilterButton } from '@components/ui/buttons'
import {
	ConversationsListItem
} from '@views/conversation/Conversations/ConversationsBar/ConversationsList/ConversationsListItem/ConversationsListItem'
import {
	ConversationsListEmptyState
} from '@views/conversation/Conversations/ConversationsEmptyState/ConversationsListEmptyState'
import { setConversationFilter } from '@store/reducers/conversationsReducer/conversationsActions'
import { filterConversations } from '@helpers/filterConversations'
import { sortConversations } from '@helpers/sortConversations'
import { PrimarySpinner } from '@components/ui/spinners'

export const ConversationsList = () => {
	const dispatch = useDispatch()
	const conversations = useSelector(state => state.conversations)
	const currentFilter = conversations.filters.filter(f => f.checked === true)
	const filteredConversations = filterConversations(conversations.conversations, conversations.filters)
	const sortedConversations = sortConversations(filteredConversations)

	const useFilterHandler = (e) => {
		dispatch(setConversationFilter(e.target.id))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.filter}>
				{
					conversations.filters.map(filter => <FilterButton key={filter.id}
																														name={filter.name}
																														id={filter.id}
																														title={filter.title}
																														checked={filter.checked}
																														handler={useFilterHandler}/>)
				}
			</div>

			<div className={styles.list}>
				{
					conversations.loading && conversations.conversations.length === 0
						? <PrimarySpinner/>
						: sortedConversations.length > 0
							? sortedConversations.map((conversation) => <ConversationsListItem key={conversation.id}
																																								 conversation={conversation}/>)
							: !sortedConversations.length > 0 && currentFilter[0].id === 'conversations-all'
								? <ConversationsListEmptyState text={'conversations'}/>
								: !sortedConversations.length > 0 && currentFilter[0].id === 'conversations-direct'
									? <ConversationsListEmptyState text={'direct conversations'}/>
									: !sortedConversations.length > 0 && currentFilter[0].id === 'conversations-group'
										? <ConversationsListEmptyState text={'group conversations'}/>
										: null
				}
			</div>
		</div>
	)
}
