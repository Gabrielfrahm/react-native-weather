
import { all, takeLatest, put, select } from 'redux-saga/effects';
import actions from './types';
import { citySuccess, cityFailure } from './action';

function* checkCity({payload}) {
    const { city } = payload;
    try {
        const check = yield select((state) => {
            return state.city.cities.find(item => item.city === city.city);
        });
        if (!check) {
            yield put(citySuccess(city));
        }else{
            yield put(cityFailure(true));
        }
    } catch (err) {
        yield put(cityFailure(true));
    }
}

export default all([
    takeLatest(actions.cityRequest, checkCity),
])