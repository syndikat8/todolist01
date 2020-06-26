import React from 'react';
import {Button} from "@material-ui/core";

type StateType = {
    isHidden: boolean
}

type OnPropsType = {
    changeFilter: (filter: string) => void
    filterValue: string
}

class TodoListFooter extends React.Component<OnPropsType, StateType> {

    state: StateType = {
        isHidden: false
    };

    onAllFilterClick = () => {
        this.props.changeFilter("All")
    };
    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed")
    };
    onActiveFilterClick = () => {
        this.props.changeFilter("Active")
    };
    onShowFiltersClick = () => {
        this.setState({isHidden: false})
    };
    onHideFiltersClick = () => {
        this.setState({isHidden: true})
    };


    render = () => {

        return (
            <div style={{paddingTop: "15px"}}>
                {!this.state.isHidden && <div>
                  <Button variant={this.props.filterValue === "All" ? "contained" : "text"}
                          onClick={this.onAllFilterClick}>Все</Button>
                  <Button variant={this.props.filterValue === "Completed" ? "contained" : "text"} color={"primary"}
                          onClick={this.onCompletedFilterClick}>Выполненые</Button>
                  <Button variant={this.props.filterValue === "Active" ? "contained" : "text"} color={"secondary"}
                          onClick={this.onActiveFilterClick}>Активные</Button>
                </div>
                }
                <div style={{paddingTop: "10px"}}>
                    {!this.state.isHidden && <span className="hide" onClick={this.onHideFiltersClick}>Скрыть фильтр</span>}
                    {this.state.isHidden && <span className="show" onClick={this.onShowFiltersClick}>Показать фильтр</span>}
                </div>
            </div>
        );
    }
}

export default TodoListFooter;
