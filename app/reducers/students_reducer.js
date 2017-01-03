import { RETRIEVE_STUDENTS } from '../actions/types';
module.exports = function(state = {}, action){
    switch(action.type){
        case RETRIEVE_STUDENTS:
            return [action.payload, ...state];
    }

    return state;
}