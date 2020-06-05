import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import todolistReducer from "./reducer";

const rootReducer = combineReducers({
  todolist:todolistReducer
})

type rootReducerType = typeof rootReducer //Будет возвращать весь state приложения
export type AppStateType = ReturnType<rootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;