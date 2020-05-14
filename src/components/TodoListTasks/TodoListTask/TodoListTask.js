import React from 'react';


class TodoListTask extends React.Component {

  state = {
    editeMode: false
  }
  activateEditMode = () => {
    this.setState({editeMode: true})
  }
  deActivateEditMode = (e) => {
    this.props.changeTitle(this.props.task, e.currentTarget.value)
    this.setState({editeMode: false})
  }
  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task, e.currentTarget.checked);
  };

  onDeliteTask= () => {
  this.props.deliteTask(this.props.task.id)
  }
  render = () => {
    let isDone = this.props.task.status === 2;
    let taskIsDoneClass = isDone ? "todoList-task done" : "todoList-task";
    return (
      <div className={taskIsDoneClass}>
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
        <span> priority: {this.props.task.priority} </span>
        <button className="delit" onClick={this.onDeliteTask}>Delete</button>
      </div>
    );
  }
}

export default TodoListTask;

