import React, { ChangeEvent } from 'react';
import {TaskType} from "../../../types/entities";

type StateType = {
  editeMode: boolean
}

type OnPropsType = {
    task: TaskType
    changeTitle: (task: TaskType, event: any)=> void
    changeStatus: (task: TaskType, event: any)=> void
    deliteTask: (id: string)=> void
}

class TodoListTask extends React.Component<OnPropsType,StateType> {

  state: StateType = {
    editeMode: false
  }
  activateEditMode = () => {
    this.setState({editeMode: true})
  }
  deActivateEditMode = (e:any) => {
    debugger
    this.props.changeTitle(this.props.task, e.currentTarget.value)
    this.setState({editeMode: false})
  }
  onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.changeStatus(this.props.task, e.currentTarget.checked ? 2 : 0);
  };

  onDeliteTask = () => {
    this.props.deliteTask(this.props.task.id)
  }
  render = () => {
    let isDone = this.props.task.status === 2;
    let taskIsDoneClass = isDone ? "todoList-task done" : "todoList-task";
    return (
      <div className={taskIsDoneClass}>
        <div>
          <input
            type="checkbox"
            checked={isDone}
            onChange={this.onIsDoneChanged}/>
          {this.state.editeMode
            ? <input
              defaultValue={this.props.task.title}
              autoFocus={true}
              onBlur={this.deActivateEditMode}/>
            : <span onClick={this.activateEditMode}> {this.props.task.title}</span>}
          <span> приоритет: {this.props.task.priority} </span>
        </div>
        <div>
          <button className="delit" onClick={this.onDeliteTask}>x</button>
        </div>
      </div>
    );
  }
}

export default TodoListTask;

