import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";


class App extends React.Component {

  state = {
    todolists: [
      // {id: 1, title: "Gym"},
      // {id: 2, title: "IT"},
      // {id: 3, title: "Every Day"},
      // {id: 4, title: "Boss"},
    ]
  }
  nextTodoListId = 0;
  componentDidMount = () => {
    this.restoreState();
  }

  saveState = () => {
    localStorage.setItem("toodolists", JSON.stringify(this.state))
  }

  restoreState = () => {
    let state = this.state
    let stateAsString = localStorage.getItem("toodolists")
    if (stateAsString) {
      state = JSON.parse(stateAsString);
    }
    this.setState(state, () => {
      this.state.todolists.forEach(todo => {
        if (todo.id >= this.nextTodoListId) {
          this.nextTodoListId = todo.id + 1;
        }
      })
    })
  }

  addTodoList = (todolistName) => {
    let newTodo = {
      title: todolistName,
      id: this.nextTodoListId,
    }
    this.nextTodoListId++;
    this.setState({
      todolists: [...this.state.todolists, newTodo]
    }, () => {
      this.saveState()
    })
  }

  render = () => {
    let todoLists = this.state.todolists.map(el => {
      return <TodoList key={el.id} id={el.id} title={el.title}/>
    })

    return (
      <>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {todoLists}
        </div>
      </>
    );
  }
}

export default App;

