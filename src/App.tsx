import React from 'react';
import './App.css';
import TodoList from "./components/Todolist/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, getTodolist} from "./redux/reducer";
import {AppStateType} from './redux/store';
import {TodoType} from "./types/entities";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

type MapDispatchPropsType = {
    getTodolist: () => void
    addTodolist: (title: string) => void
}

type MapStatePropsType = {
    todolists: Array<TodoType>
}

type PropsType = MapDispatchPropsType & MapStatePropsType

class App extends React.Component<PropsType> {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodolist()
    }

    addTodoList = (title: string) => {
        this.props.addTodolist(title)
    }

    render = () => {
        let todoLists = this.props.todolists.map(el => {
            return <TodoList key={el.id} id={el.id} title={el.title} tasks={el.tasks}/>
        })

        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar style={{display: "flex", justifyContent: "space-between", background: "#1a746b"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: "20px 0"}}>
                        <Paper elevation={5} style={{padding: "10px", background: "#d3ebd3"}}>
                            <AddNewItemForm addItem={this.addTodoList}/>
                        </Paper>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists}
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.todolist.todolists
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addTodolist,
    getTodolist
})(App);
export default ConnectedApp;


