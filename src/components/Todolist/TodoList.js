import React from 'react';
import '../../App.css';
import TodoListFooter from "../TodoListFooter/TodoListFooter";
import AddNewItemForm from "../AddNewItemForm/AddNewItemForm";
import TodoListTasks from "../TodoListTasks/TodoListTasks";
import TodoListTitle from "../TodoListTitle/TodoListTitle";


class TodoList extends React.Component {

  componentDidMount() {
    this.restoreState()
  }

  nextTaskId = 0;

  state = {
    tasks: [
      // {id: 0, title: "JS", isDone: true, priority: "low"},
      // {id: 1, title: "CSS", isDone: true, priority: "low"},
      // {id: 2, title: "HTML", isDone: true, priority: "low"},
      // {id: 3, title: "React", isDone: false, priority: "low"},
      // {id: 4, title: "Sass", isDone: false, priority: "low"},
      // {id: 5, title: "Redux", isDone: false, priority: "low"}
    ],
    filterValue: "All"
  };

  saveState = () => {
    localStorage.setItem("our-state"+this.props.id, JSON.stringify(this.state))
  }

  restoreState = () => {
    let  state = this.state
    let stateAsString = localStorage.getItem("our-state"+this.props.id)
    if(stateAsString) {
     state = JSON.parse(stateAsString);
    }
    this.setState(state, () => {
      this.state.tasks.forEach(task => {
        if( task.id >= this.nextTaskId) {
          this.nextTaskId = task.id +1;
        }
      })
    })
  }

  addTsk = (newTitle) => {
    let newTask = {
      id: this.nextTaskId,
      title: newTitle,
      isDone: true,
      priority: "low"
    };
    this.nextTaskId++;
    let newTasks = [...this.state.tasks, newTask];
    this.setState({
      tasks: newTasks
    }, () => {this.saveState()})
  };

  changeFilter = (newFilterValue) => {
    this.setState({
      filterValue: newFilterValue
    }, () => {
      this.saveState()
    })
  };

  changeTask = (taskId, obj) => {
    let newTasks = this.state.tasks.map(t => {
      if (t.id !== taskId) {
        return t;
      } else {
        return {...t, ...obj}
      }
    });
    this.setState({
      tasks: newTasks
    }, () => {
      this.saveState()
    })
  };

  changeStatus = (taskId, isDone) => {
    this.changeTask(taskId, {isDone: isDone})
  };

  changeTitle = (taskId, newTitle) => {
    this.changeTask(taskId, {title: newTitle})
  };

  deliteTask = (taskId) => {
    this.setState(({tasks}) => {
      const idx = tasks.findIndex((el) => el.id === taskId)
      const newTasks = [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1),
      ]
      return {
        tasks: newTasks
      }
    },() => {
      this.saveState()
    } )
  }
  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <div className="todoList-header">
            <TodoListTitle title={this.props.title}/>
            <AddNewItemForm addItem={this.addTsk}/>
            </div>
          <TodoListTasks
            deliteTask={this.deliteTask}
            changeTitle={this.changeTitle}
            changeStatus={this.changeStatus}
            tasks={this.state.tasks.filter(t => {
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

export default TodoList;

