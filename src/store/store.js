import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '@store/reducers/rootReducer'
import { rootSaga } from '@store/sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga)
