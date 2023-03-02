import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setContact } from '@api/contacts/setContact'
import { checkContact } from '@api/contacts/checkContact'
import { getContacts } from '@api/contacts/getContacts'
import { removeContact } from '@api/contacts/removeContact'
import { checkUser } from '@api/users/checkUser'
import { closeAddContactModal } from '@store/reducers/contactsReducer/contactsActions'
import { addContactFail, addContactSuccess, getContactsFail, getContactsSuccess, removeContactFail, removeContactSuccess } from '@store/reducers/contactsReducer/contactsActions'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'
import { replaceString } from '@helpers/replaceString'

export function* addContactSaga(props) {
  let contactId
  const userId = props.payload.uid
  const contactEmail = props.payload.email

  try {
    const existUser = yield call(checkUser, contactEmail)
    if (existUser.length > 0) {
      contactId = existUser[0]
      if (contactId !== userId) {
        const existContact = yield call(checkContact, userId, contactId)
        if (!existContact) {
          yield call(setContact, userId, contactId)
          const contacts = yield call(getContacts, userId)
          yield call(toast.success, replaceString(messages.contactAdded, contactEmail))
          yield put(addContactSuccess(contacts))
          yield put(closeAddContactModal())
        } else {
          yield call(toast.error, replaceString(messages.contactAlreadyExist, contactEmail))
        }
      } else {
        yield call(toast.error, messages.contactYourself)
      }
    } else {
      yield call(toast.error, replaceString(messages.contactNotExist, contactEmail))
    }
  } catch (err) {
    yield put(addContactFail(err.message))
    yield call(toast.error, messages.somethingWrong)
  }
}

export function* removeContactSaga(props) {
  const userId = props.payload.userId
  const contactId = props.payload.contact.uid
  const contactName = props.payload.contact.displayName

  try {
    yield call(removeContact, userId, contactId)
    const contacts = yield call(getContacts, userId)
    yield put(removeContactSuccess(contacts))
    yield call(toast.success, replaceString(messages.contactRemoved, contactName))
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
  }
}

export const contactsSaga = [
  takeLatest(actionTypes.ADD_CONTACT_START, addContactSaga),
  takeLatest(actionTypes.REMOVE_CONTACT_START, removeContactSaga),
  takeLatest(actionTypes.GET_CONTACTS_START, getContactsSaga)
]
