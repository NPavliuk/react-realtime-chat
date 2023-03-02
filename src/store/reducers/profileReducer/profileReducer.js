import { actionTypes } from '@constants/actionTypes'

const initialState = {
  data: {
    displayName: '',
    email: null,
    avatar: null,
    phone: null,
    bio: null,
    birthday: null,
    role: null,
  },
  isOpen: false,
  loading: false,
  error: null
}

export const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.GET_PROFILE_INFO_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false
      }
    case actionTypes.GET_PROFILE_INFO_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case actionTypes.OPEN_PROFILE_BAR:
      return {
        ...state,
        isOpen: true
      }
    case actionTypes.CLOSE_PROFILE_BAR:
      return {
        ...state,
       isOpen: false
      }
    default:
      return state
  }
}
