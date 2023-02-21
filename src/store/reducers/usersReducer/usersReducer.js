import { actionTypes } from '@constants/actionTypes'

const initialState = {
  users: [],
  error: null,
  loading: false,
}

export const usersReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.GET_USERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false
      }
    case actionTypes.GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
