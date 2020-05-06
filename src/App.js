import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {

  nextTodoListId = 0;



  addTodoList = (todolistName) => {
    let newTodo = {
      title: todolistName,
      id: this.nextTodoListId,
      tasks: []
    }
    this.nextTodoListId++;

    this.props.addTodoList(newTodo)
  }

  render = () => {
    let todoLists = this.props.todolists.map(el => {
      return <TodoList key={el.id} id={el.id} title={el.title} tasks={el.tasks}/>
    })

    return (
      <>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {todoLists}
        </div>
      </>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    todolists: state.todolists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (newTodolist) => {
      const action = {
        type: "ADD-TODOLIST",
        newTodolist: newTodolist
      };
      dispatch(action)
    }
  }
}

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;


