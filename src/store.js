import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { dashboardReducer, dashboardRootSaga } from './models/Dashboard'









const sagaMiddleware = createSagaMiddleware();
const store = createStore(
 combineReducers({
   dashboard: dashboardReducer,
 }),
 compose(applyMiddleware(sagaMiddleware))
)

// can add more sagas,hence scalable

const rootSagas = [
 dashboardRootSaga
]

rootSagas.forEach(sagaMiddleware.run)

export default store