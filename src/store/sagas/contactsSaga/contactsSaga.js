import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addContactFail, addContactSuccess, getContactsFail, getContactsSuccess, removeContactFail, removeContactSuccess } from '@store/reducers/contactsReducer/contactsActions'
import { setContact } from '@api/contacts/setContact'
import { checkContact } from '@api/contacts/checkContact'
import { getContacts } from '@api/contacts/getContacts'
import { removeContact } from '@api/contacts/removeContact'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'

export function* addContactSaga(props) {
  const currentUID = props.payload.currentUserID
  const contactUID = props.payload.contactUserID

  try {
    const contactExist = yield call(checkContact, currentUID, contactUID)
    if (!contactExist) {
      yield call(setContact, currentUID, contactUID)
      const contacts = yield call(getContacts, currentUID)
      yield put(addContactSuccess(contacts))
      yield call(toast.success, messages.addedContact)
    } else {
      yield call(toast.error, messages.alreadyExistingContact)
    }
  } catch (err) {
    yield put(addContactFail(err.message))
    yield call(toast.error, messages.somethingWrong)
  }
}

export function* removeContactSaga(props) {
  const currentUID = props.payload.currentUserID
  const contactUID = props.payload.contactUserID

  try {
    yield call(removeContact, currentUID, contactUID)
    const contacts = yield call(getContacts, currentUID)
    yield put(removeContactSuccess(contacts))
    yield call(toast.success, messages.removedContact)
  } catch (err) {
    yield put(removeContactFail(err.message))
    yield call(toast.error, messages.somethingWrong)
  }
}

export function* getContactsSaga(props) {
  const currentUID = props.payload

  try {
    const contacts = yield call(getContacts, currentUID)
    yield put(getContactsSuccess(contacts))
  } catch (err) {
    yield put(getContactsFail(err.message))
    yield call(toast.error, messages.somethingWrong)
  }
}

export const contactsSaga = [
  takeLatest(actionTypes.ADD_CONTACT_START, addContactSaga),
  takeLatest(actionTypes.REMOVE_CONTACT_START, removeContactSaga),
  takeLatest(actionTypes.GET_CONTACTS_START, getContactsSaga),

]
