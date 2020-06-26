import React, {ChangeEvent} from 'react';
import {TaskType} from "../../../types/entities";
import {Checkbox, Container, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type StateType = {
    editeMode: boolean
}

type OnPropsType = {
    task: TaskType
    changeTitle: (task: TaskType, newTitle: string) => void
    changeStatus: (task: TaskType, status: number) => void
    deliteTask: (id: string) => void
}

class TodoListTask extends React.Component<OnPropsType, StateType> {

    state: StateType = {
        editeMode: false
    }
    activateEditMode = () => {
        this.setState({editeMode: true})
    }
    deActivateEditMode = (e: any) => {
        debugger
        this.props.changeTitle(this.props.task, e.currentTarget.value)
        this.setState({editeMode: false})
    }
    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked ? 2 : 0);
    };

    onDeliteTask = () => {
        this.props.deliteTask(this.props.task.id)
    }
    render = () => {
        let isDone = this.props.task.status === 2;

        return (
            <Container fixed>
                <Paper elevation={10} style={{margin: "10px", background: "#c1ff7a"}}>
                    <div >
                        <Checkbox
                            color="primary"
                            checked={isDone}
                            onChange={this.onIsDoneChanged}/>
                        {this.state.editeMode
                            ? <TextField
                                defaultValue={this.props.task.title}
                                autoFocus={true}
                                onBlur={this.deActivateEditMode}/>
                            : <span onClick={this.activateEditMode}> {this.props.task.title}</span>}
                        <IconButton color={"secondary"} onClick={this.onDeliteTask}>
                            <Delete/>
                        </IconButton>
                    </div>
                </Paper>
            </Container>
        )
    }
}

export default TodoListTask;

