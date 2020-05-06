import React from 'react';
import '../../App.css';
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import {connect} from "react-redux";


class TodoList extends React.Component {


  nextTaskId = 0;

  state = {
    filterValue: "All"
  };


  addTsk = (newTitle) => {
    let newTask = {
      id: this.nextTaskId,
      title: newTitle,
      isDone: false,
      priority: "low"
    };
    this.nextTaskId++;
    this.props.addTask(this.props.id,newTask)
  };

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    })
  };

  // changeTask = (taskId, obj) => {
  //   let newTasks = this.state.tasks.map(t => {
  //     if (t.id !== taskId) {
  //       return t;
  //     } else {
  //       return {...t, ...obj}
  //     }
  //   });
  //   this.setState({
  //     tasks: newTasks
  //   })
  // };

  changeStatus = (taskId, isDone) => {
    this.props.changeTask(this.props.id, taskId, {isDone: isDone})
  };

  changeTitle = (taskId, newTitle) => {
    this.props.changeTask(this.props.id, taskId, {title: newTitle})
  };

  deliteTask = (taskId) => {
    this.props.deleteTask(taskId,this.props.id)
    }


  deleteTodolist = () => {
   this.props.deleteTodolist(this.props.id)
  }
  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <div className="todolist-item">
            <TodoListTitle deleteTodolist={this.deleteTodolist} title={this.props.title}/>
            </div>
            <AddNewItemForm addItem={this.addTsk}/>
            </div>

          <TodoListTasks
            deliteTask={this.deliteTask}
            changeTitle={this.changeTitle}
            changeStatus={this.changeStatus}
            tasks={this.props.tasks.filter(t => {
              switch (this.state.filterValue) {
                case "All":
                  return true;
                case "Completed":
                  return t.isDone;
                case "Active":
                  return !t.isDone;
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


const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (todolistId, newTask) => {
      const action = {
        type: "ADD-TASK",
        todolistId: todolistId,
        newTask:newTask
      }
      dispatch(action)
    },
    changeTask: (todolistId,taskId, obj) => {
      const action = {
        type:"CHANGE-TASK",
        todolistId: todolistId,
        taskId: taskId,
        obj: obj
      }
      dispatch(action)
    },
    deleteTodolist: (todolistId) => {
      const action = {
        type:"DELETE-TODOLISTID",
        todolistId: todolistId,

      }
      dispatch(action)
    },
    deleteTask: (taskId,todolistId) => {
      const action = {
        type: "DELETE-TASK",
        taskId: taskId,
        todolistId: todolistId,
      }
      dispatch(action)
    }
  }
}

const ConnectedTodolist = connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

