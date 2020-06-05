import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolist} from "./redux/reducer";
import {AppStateType} from './redux/store';
import {TodoType} from "./types/entities";

type MapDispatchPropsType = {
    getTodolist: () => void
    addTodolist: (title: string) => void
}

type MapStatePropsType = {
    todolists: Array<TodoType>
}

type PropsType = MapDispatchPropsType & MapStatePropsType

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodolist()
    }

    addTodoList = (title: string) => {
        this.props.addTodolist(title)
    }

    render = () => {
        let todoLists = this.props.todolists.map(el => {
            return <TodoList key={el.id} id={el.id} title={el.title} tasks={el.tasks}/>
        })

        return (
            <div className="App" >
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App-todo">
                    {todoLists}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addTodolist,
    getTodolist
})(App);
export default ConnectedApp;


