import { actionTypes } from '@constants/actionTypes'

const initialState = {
  id: null,
  loading: true,
  error: null,
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
		case actionTypes.WATCH_SESSION_START:
      return {
        ...state,
        loading: true
      }
		case actionTypes.SET_LOCAL_SESSION:
		case actionTypes.WATCH_SESSION_SUCCESS:
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        id: payload,
        loading: false
      }
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false
      }
		case actionTypes.WATCH_SESSION_FAIL:
    case actionTypes.UPDATE_USER_DATA_FAIL:
    case actionTypes.SIGN_IN_FAIL:
    case actionTypes.SIGN_UP_FAIL:
    case actionTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
