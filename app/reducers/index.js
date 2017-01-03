import { combineReducers } from 'redux';
import studentReducer from './students_reducer';

const rootReducer = combineReducers({
  student: studentReducer
});

export default rootReducer;