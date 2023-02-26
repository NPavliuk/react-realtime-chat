import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  addContactFail,
  addContactSuccess,
  getContactsFail,
  getContactsSuccess,
  removeContactFail,
  removeContactSuccess
} from '@store/reducers/contactsReducer/contactsActions'
import { closeAddContactModal } from '@store/reducers/contactsReducer/contactsActions'
import { setContact } from '@api/contacts/setContact'
import { checkContact } from '@api/contacts/checkContact'
import { getContacts } from '@api/contacts/getContacts'
import { removeContact } from '@api/contacts/removeContact'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import { checkUser } from '@api/users/checkUser'

export function* addContactSaga(props) {
  let contactId
  const userId = props.payload.uid
  const contactEmail = props.payload.email

  try {
    const existUser = yield call(checkUser, contactEmail)

    if (existUser.length > 0) {
      contactId = existUser[0]

      if(contactId !== userId) {
        const existContact = yield call(checkContact, userId, contactId)

        if (!existContact) {
          yield call(setContact, userId, contactId)
          const contacts = yield call(getContacts, userId)
          yield call(toast.success, `${contactEmail} now your contact`)
          yield put(addContactSuccess(contacts))
          yield put(closeAddContactModal())
        } else {
          yield call(toast.error, `${contactEmail} user already your contact`)
        }
      } else {
        yield call(toast.error, `You can't add yourself to contacts`)
      }
    } else {
      yield call(toast.error, `User with ${contactEmail} email does not exist`)
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
  takeLatest(actionTypes.GET_CONTACTS_START, getContactsSaga)
]
