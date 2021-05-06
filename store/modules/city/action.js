import actions from './types';

export function cityRequest(city){
    return {
        type: actions.cityRequest,
        payload: {
            city,
        }
    }
}

export function citySuccess(city){
    return {
        type: actions.citySuccess,
        payload: {
            city,
        }
    }
}

export function cityFailure(error){
    return {
        type: actions.cityFailure,
        payload: {
            error,
        }
    }
}