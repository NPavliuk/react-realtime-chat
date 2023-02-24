import { actionTypes } from '@constants/actionTypes'

const initialState = {
  data: {
    email: null,
    avatar: null,
    phone: null,
    displayName: '',
  },
  error: null,
  loading: false,
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.GET_USER_DATA_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false
      }
    case actionTypes.GET_USER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}
