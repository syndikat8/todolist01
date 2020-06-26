import React, {ChangeEvent, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core"
import {AddBox} from "@material-ui/icons";

type StateType = {
    error: boolean
    title: string
}

type OnPropsType = {
    addItem: (newText: string) => void
}

//Если есть локальный стейт и пропсы. То первым передаем пропсы
class AddNewItemForm extends React.Component<OnPropsType, StateType> {


    state: StateType = {
        error: false,
        title: "",
    };


    onAddItemClick = () => {
        let newTitle = this.state.title;

        if (newTitle === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false, title: ""})
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
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    };


    render = () => {

        return (
            <div className="todoList-newTaskForm">
                <TextField
                    error={!!this.state.error}
                    helperText={this.state.error? "Title is required": ""}
                    variant={"outlined"}
                    label="Type value"
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                />
                <IconButton color={"primary"} onClick={this.onAddItemClick}>
                    <AddBox style={{height: "35px", width: "35px"}} />
                </IconButton>
            </div>
        )
    }
}

export default AddNewItemForm;

