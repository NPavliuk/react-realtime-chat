import { actionTypes } from '@constants/actionTypes'

const initialState = {
  contacts: [],
  error: null,
  loading: false,
}

export const contactsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.REMOVE_CONTACT_START:
    case actionTypes.GET_CONTACTS_START:
    case actionTypes.ADD_CONTACT_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.REMOVE_CONTACT_SUCCESS:
    case actionTypes.ADD_CONTACT_SUCCESS:
    case actionTypes.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: payload,
        loading: false
      }
    case actionTypes.REMOVE_CONTACT_FAIL:
    case actionTypes.GET_CONTACTS_FAIL:
    case actionTypes.ADD_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
