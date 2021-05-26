/** @format */
import darkmode from './darkmode'
import auth from './auth'
import { combineReducers, createStore } from "redux";
const reducer = combineReducers({darkmode,auth});
const store = createStore(reducer);
export default store