import { actionTypes } from '@constants/actionTypes'

const initialState = {
  data: {
    name: '',
    email: null,
    avatar: null,
    phone: null,
    bio: null,
    birthday: null,
    role: null,
  },
  error: null,
  loading: false,
}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.UPDATE_USER_DATA_START:
    case actionTypes.GET_USER_DATA_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_USER_DATA_SUCCESS:
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false
      }
    case actionTypes.UPDATE_USER_DATA_FAIL:
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
