import { call, put, take, cancelled, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { getAllUsers } from '@api/users/getAllUsers'
import { watchUsersStatus } from '@api/users/watchUsersStatus'
import {
	getUsersFail,
	getUsersSuccess,
	watchUsersStatusFail,
	watchUsersStatusSuccess
} from '@store/reducers/usersReducer/usersActions'
import { actionTypes } from '@constants/actionTypes'

export function* getUsersSaga() {
  try {
    const data = yield call(getAllUsers)
    yield put(getUsersSuccess(data))
  } catch (err) {
    yield put(getUsersFail(err.message))
  }
}

export function* watchUsersStatusSaga() {
	const channel = yield call(watchUsersStatus, eventChannel)

	try {
		while (true) {
			const usersStatuses = yield take(channel)
			yield put(watchUsersStatusSuccess(usersStatuses))
		}
	} catch (error) {
		yield put(watchUsersStatusFail(error))
	} finally {
		if (yield cancelled()) {
			channel.close()
		}
	}
}


export const usersSaga = [
  takeLatest(actionTypes.GET_USERS_START, getUsersSaga),
	takeLatest(actionTypes.WATCH_USERS_STATUS_START, watchUsersStatusSaga)
]
