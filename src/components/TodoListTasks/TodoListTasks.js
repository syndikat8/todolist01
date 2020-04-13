import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";
import PropTypes from 'prop-types';


class TodoListTasks extends React.Component {
  render = () => {
    let taskElements = this.props.tasks.map(task => {
      return <TodoListTask
        deliteTask={this.props.deliteTask}
        changeTitle={this.props.changeTitle}
        changeStatus={this.props.changeStatus}
        task={task}
      />
    });
    return (
      <div className="todoList-tasks">
        {taskElements}
      </div>
    );
  }
}

export default TodoListTasks;
TodoListTasks.proTypes = {
  tasks: PropTypes.object
}

