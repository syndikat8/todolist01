import React from 'react';


class TodoListTask extends React.Component {

  state = {
    editeMode: false
  }
  activateEditMode = () => {
    this.setState({editeMode: true})
  }
  deActivateEditMode = () => {
    this.setState({editeMode: false})
  }
  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
  };
  onTitleChanged = (e) => {
    this.props.changeTitle(this.props.task.id, e.currentTarget.value);
  };

  onDeliteTask= () => {
  this.props.deliteTask(this.props.task.id)
  }
  render = () => {
    let taskIsDoneClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";
    return (
      <div className={taskIsDoneClass}>
        <input
          type="checkbox"
          checked={this.props.task.isDone}
          onChange={this.onIsDoneChanged}/>
        <span>{this.props.task.id}: </span>
        {this.state.editeMode
          ? <input
            value={this.props.task.title}
            autoFocus={true}
            onBlur={this.deActivateEditMode}
            onChange={this.onTitleChanged}/>
          : <span onClick={this.activateEditMode}> {this.props.task.title}</span>}
        <span> priority: {this.props.task.priority} </span>
        <button className="delit" onClick={this.onDeliteTask}>Delete</button>
      </div>
    );
  }
}

export default TodoListTask;

