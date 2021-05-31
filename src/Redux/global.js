/** @format */
import darkmode from './darkmode'
import auth from './auth'
import chats from './conversations'
import messages from './messages'
import { combineReducers, createStore } from "redux";
const reducer = combineReducers({darkmode,auth,chats,messages});
const store = createStore(reducer);
export default store