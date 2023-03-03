import { actionTypes } from '@constants/actionTypes'

const initialState = {
  addModal: false,
  loading: false,
  error: null
}

export const conversationsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.OPEN_ADD_CONVERSATION_MODAL:
      return {
        ...state,
        addModal: true
      }
    case actionTypes.CLOSE_ADD_CONVERSATION_MODAL:
      return {
        ...state,
        addModal: false
      }
    default:
      return state
  }
}
