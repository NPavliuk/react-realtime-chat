import { actionTypes } from '@constants/actionTypes'

const initialState = {
  isOpen: false
}

export const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
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
