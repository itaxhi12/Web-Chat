/** @format */
import darkmode from './darkmode'
import auth from './auth'
import chats from './conversations'
import { combineReducers, createStore } from "redux";
const reducer = combineReducers({darkmode,auth,chats});
const store = createStore(reducer);
export default store