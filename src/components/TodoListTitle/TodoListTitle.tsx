import React, {ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type StateType = {
    editeMode: boolean
    title: string
}

type OnPropsType = {
    changeTodolistTitle: (newText: string) => void
    deleteTodolist: () => void
    title: string
}

class TodoListTitle extends React.Component<OnPropsType, StateType> {

    state: StateType = {
        editeMode: false,
        title: this.props.title
    }

    onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({title: e.currentTarget.value})
    }

    activateEditMode = () => {
        this.setState({editeMode: true})
    }

    deActivateEditMode = () => {
        this.props.changeTodolistTitle(this.state.title)
        this.setState({editeMode: false})
    }
    render = () => {

        return (
            <div style={{display: "flex", justifyContent: "space-between"}} >
                {this.state.editeMode
                    ? <TextField
                        value={this.state.title}
                        type="text"
                        autoFocus={true}
                        onChange={this.onTitleChange}
                        onBlur={this.deActivateEditMode}
                    />
                    : <h3 onClick={this.activateEditMode}>{this.state.title}</h3>
                }
                <IconButton color={"secondary"} onClick={this.props.deleteTodolist}>
                    <Delete/>
                </IconButton>
            </div>
        )
    }
}

export default TodoListTitle;

