import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import todolistReducer from "./reducer";

const reducer = combineReducers({
  todolist:todolistReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
export default store;