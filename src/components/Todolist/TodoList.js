import React from 'react';
import '../../App.css';
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import {connect} from "react-redux";
import {
  addTsk, changeTask, deleteTodo, updateTodolistTitle, getTasks, changeStatus, changeTitle, deletaTask
} from "../../redux/reducer";

class TodoList extends React.Component {

  componentDidMount() {
    this.props.getTasks(this.props.id)
  }

  state = {
    filterValue: "All"
  };


  addTsk = (newTitle) => {
    this.props.addTsk(newTitle, this.props.id)
  };

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    })
  };

  changeStatus = (task, status) => {
    this.props.changeStatus(this.props.id, task, status)
  };

  changeTitle = (task, newTitle) => {
    debugger
    this.props.changeTitle(this.props.id, task, newTitle)
  };

  deliteTask = (taskId) => {
    this.props.deletaTask(this.props.id, taskId)
  }

  deleteTodolist = () => {
    this.props.deleteTodo(this.props.id)
  }

  changeTodolistTitle = (newTitle) => {
    this.props.updateTodolistTitle(this.props.id, newTitle)

  }

  render = () => {

    let {tasks = []} = this.props

    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <div className="todolist-item">
              <TodoListTitle
                id={this.props.id}
                changeTodolistTitle={this.changeTodolistTitle}
                deleteTodolist={this.deleteTodolist}
                title={this.props.title}/>
            </div>
            <AddNewItemForm addItem={this.addTsk}/>
          </div>

          <TodoListTasks
            deliteTask={this.deliteTask}
            changeTitle={this.changeTitle}
            changeStatus={this.changeStatus}
            tasks={tasks.filter(t => {
              switch (this.state.filterValue) {
                case "All":
                  return true;
                case "Completed":
                  return t.status === 2;
                case "Active":
                  return t.status !== 2;
              }
            })}/>
          <TodoListFooter filterValue={this.state.filterValue}
                          changeFilter={this.changeFilter}
          />
        </div>
      </div>
    );
  }
}

const ConnectedTodolist = connect(null, {
  changeTask,
  deleteTodo,
  updateTodolistTitle,
  getTasks,
  addTsk,
  changeStatus,
  changeTitle,
  deletaTask
})(TodoList);
export default ConnectedTodolist;

