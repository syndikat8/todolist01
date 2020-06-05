import React from 'react';

type StateType = {
  isHidden: boolean
}

type OnPropsType = {
  changeFilter: (filter: string)=> void
  filterValue: string
}

class TodoListFooter extends React.Component<OnPropsType,StateType> {

  state: StateType = {
    isHidden: false
  };

  onAllFilterClick = () => {this.props.changeFilter("All")};
  onCompletedFilterClick = () => {this.props.changeFilter("Completed")};
  onActiveFilterClick = () => {this.props.changeFilter("Active")};
  onShowFiltersClick = () => {this.setState({isHidden: false}) };
  onHideFiltersClick = () => {this.setState({isHidden: true}) };


  render = () => {

    let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
    let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
    let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

    return (
      <div className="todoList-footer">
        {!this.state.isHidden && <div>
          <button className={classForAll} onClick={this.onAllFilterClick}>Все</button>
          <button className={classForCompleted} onClick={this.onCompletedFilterClick}>Выполненые</button>
          <button className={classForActive} onClick={this.onActiveFilterClick}>Активные</button>
        </div>
        }
       { !this.state.isHidden && <span className="hide" onClick={this.onHideFiltersClick}>Скрыть фильтр</span>}
       { this.state.isHidden && <span className="show" onClick={this.onShowFiltersClick}>Показать фильтр</span>}
      </div>
    );
  }
}

export default TodoListFooter;
