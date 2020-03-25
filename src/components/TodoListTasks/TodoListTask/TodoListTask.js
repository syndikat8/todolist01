import React from 'react';


class TodoListTask extends React.Component {

  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task, e.currentTarget.checked)

  }

  render = () => {
    return (
        <div className="todoList-task">
          <input
            type="checkbox"
            checked={this.props.isDone}
            onCahnge={this.onIsDoneChanged}
          />
          <span>{this.props.task.title} priority: {this.props.task.priority}</span>
        </div>
    );
  }
}

export default TodoListTask;

