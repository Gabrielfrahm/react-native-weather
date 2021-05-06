import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';


const sagaMiddleware = createSagaMiddleware();

const middleware= [sagaMiddleware];

const store = createStore(
    RootReducer,
    applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSaga);

export default store;