import React from 'react';
import '../../App.css';
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListTitle from "../TodoListTitle/TodoListTitle";
import {connect} from "react-redux";
import {
  addTsk, deleteTodo, updateTodolistTitle, getTasks, changeStatus, changeTitle, deletaTask
} from "../../redux/reducer";
import {TaskType} from "../../types/entities";
import {AppStateType} from "../../redux/store";

type StateType = {
  filterValue: string
}

type OnPropsType = {
  tasks: Array<TaskType>
  id: string
  title: string
}

type MapDispatchPropsType = {
  getTasks: (id: string)=> void
  addTsk: (newTitle: string, id: string)=> void
  changeStatus: (id: string, task:TaskType, status: number)=> void
  changeTitle: (id: string, task:TaskType, newTitle: string)=> void
  deletaTask: (id: string, taskId: string)=> void
  deleteTodo: (id: string)=> void
  updateTodolistTitle: (id: string, newTitle: string)=> void
}

type PropsType = MapDispatchPropsType & OnPropsType

class TodoList extends React.Component<PropsType,StateType> {

  componentDidMount() {
    this.props.getTasks(this.props.id)
  }

  state: StateType = {
    filterValue: "All"
  };


  addTsk = (newTitle: string) => {
    this.props.addTsk(newTitle, this.props.id)
  };

  changeFilter = (newFilterValue:string) => {
    this.setState({
      filterValue: newFilterValue
    })
  };

  changeStatus = (task: TaskType, status: number) => {
    this.props.changeStatus(this.props.id, task, status)
  };

  changeTitle = (task: TaskType, newTitle: string) => {
    debugger
    this.props.changeTitle(this.props.id, task, newTitle)
  };

  deliteTask = (taskId: string) => {
    this.props.deletaTask(this.props.id, taskId)
  }

  deleteTodolist = () => {
    this.props.deleteTodo(this.props.id)
  }

  changeTodolistTitle = (newTitle: string) => {
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
                // id={this.props.id}
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
            })}
          />
          <TodoListFooter filterValue={this.state.filterValue}
                          changeFilter={this.changeFilter}
          />
        </div>
      </div>
    );
  }
}

const ConnectedTodolist = connect<{},MapDispatchPropsType,OnPropsType,AppStateType>(null, {
  deleteTodo,
  updateTodolistTitle,
  getTasks,
  addTsk,
  changeStatus,
  changeTitle,
  deletaTask
})(TodoList);
export default ConnectedTodolist;

