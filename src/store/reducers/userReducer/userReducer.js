import { actionTypes } from '@constants/actionTypes'

const initialState = {
  uid: null,
  data: null,
  error: null,
  loading: false,
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.GET_USER_DATA_START:
    case actionTypes.SIGNIN_START:
    case actionTypes.SIGNUP_START:
    case actionTypes.SIGNOUT_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_USER:
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.SIGNOUT_SUCCESS:
      return {
        ...state,
        uid: payload,
        loading: false
      }
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false
      }
    case actionTypes.GET_USER_DATA_FAIL:
    case actionTypes.SIGNIN_FAIL:
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.SIGNOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
