import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter/TodoListFooter";

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader/>
          <TodoListTasks/>
          <TodoListFooter/>
        </div>
      </div>
    );
  }
}

export default App;

