import styles from './ConversationsList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FilterButton } from '@components/ui/buttons'
import { ConversationsListItem } from '@views/conversation/Conversations/ConversationsBar/ConversationsList/ConversationsListItem/ConversationsListItem'
import { ConversationsListEmptyState } from '@views/conversation/Conversations/ConversationsEmptyState/ConversationsListEmptyState'
import { setConversationFilter } from '@store/reducers/conversationsReducer/conversationsActions'
import { filterConversations } from '@helpers/filterConversations'
import { sortConversations } from '@helpers/sortConversations'

export const ConversationsList = () => {
	const dispatch = useDispatch()
	const conversations = useSelector(state => state.conversations.conversations)
	const conversationsFilters = useSelector(state => state.conversations.filters)
	const currentFilter = conversationsFilters.filter(f => f.checked === true)

	const filteredConversations = filterConversations(conversations, conversationsFilters)
	const sortedConversations = sortConversations(filteredConversations)

	const useFilterHandler = (e) => {
		dispatch(setConversationFilter(e.target.id))
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.filter}>
				{
					conversationsFilters.map(filter => <FilterButton key={filter.id} name={filter.name} id={filter.id}
																													 title={filter.title} checked={filter.checked}
																													 handler={useFilterHandler}/>)
				}
			</div>

			<div className={styles.list}>
				{
					sortedConversations.length > 0
						? sortedConversations.map((conversation) => <ConversationsListItem key={conversation.id} conversation={conversation}/>)
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
