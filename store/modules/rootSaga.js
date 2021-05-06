import { all } from 'redux-saga/effects';
import city from './city/saga';


export default function* rootSaga() {
    yield all([
        city,
    ])
}