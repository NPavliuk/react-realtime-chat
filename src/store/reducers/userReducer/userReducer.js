import { actionTypes } from '@constants/actionTypes'

const initialState = {
  user: null,
  loading: false,
  error: null
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false
      }
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
