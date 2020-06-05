import React, { ChangeEvent,KeyboardEvent } from 'react';

type StateType = {
  error: boolean
  title: string
}

type OnPropsType = {
  addItem: (newText: string)=> void
}
//Если есть локальный стейт и пропсы. То первым передаем пропсы
class AddNewItemForm extends React.Component<OnPropsType,StateType> {


  state: StateType = {
    error: false,
    title: "",
  };


  onAddItemClick = () => {
    let newTitle = this.state.title;

    if (newTitle === "") {
      this.setState({error: true})
    } else {
      this.setState({error: false,title: ""})
      this.props.addItem(newTitle)
    }

  };

  onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      error: false,
      title: e.currentTarget.value
    })
  };

  onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      this.onAddItemClick()
    }

  };


  render = () => {

    let classNameInput = this.state.error ? "error" : "";

    return (
        <div className="todoList-newTaskForm">
          <input
                 type="text"
                 placeholder="New item name"
                 className={classNameInput}
                 onChange={this.onTitleChanged}
                 onKeyPress={this.onKeyPress}
                 value={this.state.title}
          />
          <button onClick={this.onAddItemClick}>Add</button>
        </div>
    );
  }
}

export default AddNewItemForm;

