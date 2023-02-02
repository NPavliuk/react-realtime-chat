import { actionTypes } from '@constants/actionTypes'

const initialState = {
  uid: null,
  loading: false,
  error: null,
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.SIGN_IN_START:
    case actionTypes.SIGN_UP_START:
    case actionTypes.SIGN_OUT_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_AUTH_STATUS:
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        uid: payload,
        loading: false
      }
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
