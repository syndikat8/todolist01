import React from 'react';
import TodoListTask from "./TodoListTask/TodoListTask";
import { TaskType } from '../../types/entities';


type OnPropsType = {
    tasks: Array<TaskType>
    deliteTask: () => void
    changeTitle: () => void
    changeStatus: () => void
}


class TodoListTasks extends React.Component<OnPropsType> {

    render = () => {
        let taskElements = this.props.tasks.map(task => {
            return <TodoListTask
                key={task.id}
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
