import { fork } from 'redux-saga/effects'

export function* getUser() {

}

export const userSaga = [fork(getUser)]
