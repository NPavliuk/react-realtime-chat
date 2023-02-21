import { actionTypes } from '@constants/actionTypes'

export const addContactStart = (data) => ({
  type: actionTypes.ADD_CONTACT_START,
  payload: data
})

export const addContactSuccess = (contacts) => ({
  type: actionTypes.ADD_CONTACT_SUCCESS,
  payload: contacts
})

export const addContactFail = (error) => ({
  type: actionTypes.ADD_CONTACT_FAIL,
  payload: error
})

export const removeContactStart = (data) => ({
  type: actionTypes.REMOVE_CONTACT_START,
  payload: data
})

export const removeContactSuccess = (contacts) => ({
  type: actionTypes.REMOVE_CONTACT_SUCCESS,
  payload: contacts
})

export const removeContactFail = (error) => ({
  type: actionTypes.REMOVE_CONTACT_FAIL,
  payload: error
})


export const getContactsStart = (data) => ({
  type: actionTypes.GET_CONTACTS_START,
  payload: data
})

export const getContactsSuccess = (contacts) => ({
  type: actionTypes.GET_CONTACTS_SUCCESS,
  payload: contacts
})

export const getContactsFail = (error) => ({
  type: actionTypes.GET_CONTACTS_FAIL,
  payload: error
})
