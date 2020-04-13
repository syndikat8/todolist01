import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter/TodoListFooter";

class App extends React.Component {

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
    localStorage.setItem("our-state", JSON.stringify(this.state))
  }

  restoreState = () => {
    let  state = this.state
    let stateAsString = localStorage.getItem("our-state")
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

  addTask = (newTitle) => {
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
    }, () => {
      this.saveState()
    })
  }
  render = () => {

    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader addTask={this.addTask}/>
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

export default App;

