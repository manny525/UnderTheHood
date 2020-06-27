import cardReducer from './cardReducer';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';

const RootReducer=combineReducers({
    loginReducer,
    cardReducer
})

export default RootReducer