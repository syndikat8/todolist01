import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListAC, setTodoListAC} from "./redux/reducer";
import axios from "axios";

class App extends React.Component {

componentDidMount() {
  this.restoreState()
}

  restoreState = () => {
    axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
      .then(res => {
        this.props.setTodoList(res.data);
      });
  }

  nextTodoListId = 0;

  addTodoList = (title) => {
    axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
      {title: title},
      {
        withCredentials: true,
        headers: {"API-KEY":"a4868654-1346-4601-9c9f-2bf29679e35a"}
      }
    ).then(response => {
      if (response.data.resultCode === 0) {
        this.props.addTodoList(response.data.data.item)
      }
    } )

// let newTodo = {
    //   title: todolistName,
    //   id: this.nextTodoListId,
    //   tasks: []
    // }
    // this.nextTodoListId++;

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
      dispatch(addTodoListAC(newTodolist))
    },
    setTodoList: (todolist) => {
      dispatch(setTodoListAC(todolist))
    }
  }
}

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectedApp;


