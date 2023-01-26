import { actionTypes } from '@constants/actionTypes'

const initialState = {}

export const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.TEST_ACTION_TYPE:
      return {
        ...state,
        test: 'work'
      }
    default:
      return state
  }
}
