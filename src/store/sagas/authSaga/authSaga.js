import toast from 'react-hot-toast'
import { eventChannel } from 'redux-saga'
import { call, put, takeLatest, cancelled, take } from 'redux-saga/effects'
import { signOut } from 'firebase/auth'
import { auth } from '@api/firebase'
import { setUserToDb } from '@api/user/setUser'
import { signUpWithEmailPassword } from '@api/auth/signUp'
import { signInWithEmailPassword } from '@api/auth/signIn'
import { updateUserPassword } from '@api/auth/updatePassword'
import { watchUserStatus } from '@api/user/watchUserStatus'
import { watchAuthSession } from '@api/auth/watchAuthSession'
import { setUserOfflineStatus } from '@api/user/setUserOfflineStatus'
import { getUserDataStart } from '@store/reducers/userReducer/userActions'
import {
	signUpFail,
	signUpSuccess,
	signInSuccess,
	signInFail,
	signOutFail,
	signOutSuccess,
	updatePasswordFail,
	updatePasswordSuccess, watchSessionSuccess, watchSessionFail
} from '@store/reducers/authReducer/authActions'
import { removeSessionFromLocalStorage, saveSessionToLocalStorage } from '@helpers/localStorage'
import { routeNames } from '@constants/routeNames'
import { actionTypes } from '@constants/actionTypes'
import { messages } from '@constants/validationMessages'

export function* signUpWithEmailPasswordSaga(props) {
	const name = props.payload.name
	const email = props.payload.email
	const password = props.payload.password
	const navigate = props.payload.navigate

	try {
		if (email && password) {
			const user = yield call(signUpWithEmailPassword, email, password)
			user.name = name
			yield call(setUserToDb, user)
			navigate(routeNames.CONVERSATIONS)
			yield call(saveSessionToLocalStorage, user.uid)
			yield put(signUpSuccess(user.uid))
			yield call(toast.success, messages.signUpSuccess)
		}
	} catch (err) {
		yield put(signUpFail(err.message))
		yield call(toast.error, messages.somethingWrong)
	}
}

export function* signInWithEmailPasswordSaga(props) {
	const email = props.payload.email
	const password = props.payload.password
	const navigate = props.payload.navigate

	try {
		if (email && password) {
			const res = yield call(signInWithEmailPassword, email, password)
			if (res.uid) {
				navigate(routeNames.CONVERSATIONS)
				yield put(signInSuccess(res.uid))
				yield call(saveSessionToLocalStorage, res.uid)
				yield call(toast.success, messages.signInSuccess)
			} else {
				yield put(signInFail(res))
				yield call(toast.error, messages.signInFailed)
			}
		}
	} catch (err) {
		yield put(signInFail(err.message))
		yield call(toast.error, messages.somethingWrong)
	}
}

export function* signOutSaga(props) {
	const navigate = props.payload.navigate
	const userID = props.payload.userID

	try {
		yield call(signOut, auth)
		yield call(setUserOfflineStatus, userID)
		yield call(removeSessionFromLocalStorage)
		navigate(routeNames.HOME)
		yield put(signOutSuccess())
	} catch (err) {
		yield put(signOutFail(err.message))
		yield call(toast.error, messages.somethingWrong)
	}
}

export function* updatePasswordSaga(props) {
	const newPassword = props.payload.newPassword

	try {
		const response = yield call(updateUserPassword, newPassword)
		yield put(updatePasswordSuccess())
		if (response) {
			yield call(toast.error, messages.passwordUpdateFailed)
		} else {
			yield call(toast.success, messages.passwordUpdated)
		}
	} catch (err) {
		yield put(updatePasswordFail(err.message))
		yield call(toast.error, messages.somethingWrong)
	}
}

export function* watchAuthSessionSaga() {
	const channel = yield call(watchAuthSession, eventChannel)

	try {
		while (true) {
			const user = yield take(channel)
			// Does not work if null and undefined are returned
			if (user !== 'null') {
				yield put(watchSessionSuccess(user.uid))
				yield put(getUserDataStart(user.uid))
				yield call(watchUserStatus(user.uid))
			}
		}
	} catch (error) {
		yield put(watchSessionFail(error))
	} finally {
		if (yield cancelled()) {
			channel.close()
		}
	}
}

export const authSaga = [
	takeLatest(actionTypes.SIGN_UP_START, signUpWithEmailPasswordSaga),
	takeLatest(actionTypes.SIGN_IN_START, signInWithEmailPasswordSaga),
	takeLatest(actionTypes.SIGN_OUT_START, signOutSaga),
	takeLatest(actionTypes.UPDATE_PASSWORD_START, updatePasswordSaga),
	takeLatest(actionTypes.WATCH_SESSION_START, watchAuthSessionSaga)
]
