import { actionTypes } from '@constants/actionTypes'

const initialState = {
  id: null,
  loading: false,
  error: null,
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SIGN_IN_START:
    case actionTypes.SIGN_UP_START:
    case actionTypes.SIGN_OUT_START:
    case actionTypes.UPDATE_USER_DATA_START:
      return {
        ...state,
        loading: true
      }
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
