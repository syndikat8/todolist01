import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolist} from "./redux/reducer";


class App extends React.Component {

componentDidMount() {
  this.restoreState()
}

  restoreState = () => {
    this.props.getTodolist()
  }

  addTodoList = (title) => {
  this.props.addTodolist(title)
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
    todolists: state.todolist.todolists
  }
}

const ConnectedApp = connect(mapStateToProps,{addTodolist,getTodolist})(App);
export default ConnectedApp;


