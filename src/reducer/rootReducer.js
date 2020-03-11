import {combineReducers} from 'redux';

import AuthenticationReducer from './authenticationReducer.js';
import CartReducer from './cartReducer';
const rootReducer = combineReducers({
    auth: AuthenticationReducer,
    cart: CartReducer
});

export default rootReducer;