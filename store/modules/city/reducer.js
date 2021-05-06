import {Reducer} from 'redux';
import producer from 'immer';
import actions from './types';

const INITIAL_STATE =  {
    cities :[],
    error: false,
}

const city = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case actions.citySuccess: {
                const {city} = action.payload;
                if(draft.cities.length === 3){
                    draft.cities.splice(0,1);
                    draft.cities.push(city);
                }else{
                    draft.cities.push(city);
                }
                draft.error = false;
                break;
            }
            case actions.cityFailure: {
                const {error} = action.payload;
                draft.error = error;
                break;
            }
        }
    })
}

export default city;