import React from 'react';
import '../../App.css';
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import {connect} from "react-redux";
import {addTaskAC, changeTaskAC, deleteTaskAC, deleteTodolistAC, setTasksAC} from "../../redux/reducer";
import axios from "axios";

class TodoList extends React.Component {


 componentDidMount() {
   axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
     {
       withCredentials: true,
       headers: {"API-KEY":"a4868654-1346-4601-9c9f-2bf29679e35a"}
     }
   ).then(response => {
       this.props.setTasks(response.data.items, this.props.id)
   })
 }

  state = {
    filterValue: "All"
  };


  addTsk = (newTitle) => {
    axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
      {title: newTitle},
      {
        withCredentials: true,
        headers: {"API-KEY":"a4868654-1346-4601-9c9f-2bf29679e35a"}
      }
    ).then(response => {
      if (response.data.resultCode === 0) {
        this.props.addTask(response.data.data.item, this.props.id)
      }
    } )
  };

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    })
  };


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
    axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${this.props.id}`,
      {
        withCredentials: true,
        headers: {"API-KEY":"a4868654-1346-4601-9c9f-2bf29679e35a"}
      }
    ).then(response => {
      if (response.data.resultCode === 0) {
        this.props.deleteTodolist(this.props.id)
      }
    } )
  }
  render = () => {

    let {tasks = []} = this.props

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
            tasks={tasks.filter(t => {
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
    addTask: (newTask,todolistId) => {
      dispatch(addTaskAC(newTask,todolistId))
    },
    changeTask: (todolistId,taskId, obj) => {

      dispatch(changeTaskAC(todolistId,taskId, obj))
    },
    deleteTodolist: (todolistId) => {
      dispatch(deleteTodolistAC(todolistId))
    },
    deleteTask: (taskId,todolistId) => {
      dispatch(deleteTaskAC(taskId,todolistId))
    },
    setTasks: (task,todolistId) => {
      dispatch(setTasksAC(task,todolistId))
    }
  }
}

const ConnectedTodolist = connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTodolist;

