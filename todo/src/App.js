import React from "react";
import Axios from "axios";

import Todo from "./components/Todo";
import Header from "./components/Header";
import TaskType from "./components/TaskType";
import withLoader from "./components/withLoader";
import { API_HOST } from "./helpers/constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: props.todos
        ? props.todos
        : [
            {
              data: "Create a todo list",
              isDone: false,
              created_at: new Date(),
              isStared: false
            }
          ],
      searchText: "",
      isSearching: false,
      searchItems: [],
      currentTaskType: "All",
      isEditing: ""
    };
  }

  handleUpdate = uid => {
    let editedTodo = this.state.todos.filter(todo => todo.id === uid);

    this.setState({ todo: editedTodo[0].data, isEditing: uid });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    let { todo, todos, isEditing } = this.state;

    if (todo && todo.trim().length) {
      let newTodo = {
        data: todo,
        isDone: false
      };
      if (isEditing) {
        let res = await Axios.put(`${API_HOST}api/todos/${isEditing}`, newTodo);
        todos =todos.map(d=>d.id===res.data.id?res.data:d);
        console.log(todos)
        console.log(res.data)

        this.setState({
          todos,
          todo: "",
          searchText: "",
          isSearching: false,
          isEditing: null
        });
      } else {
        let res = await Axios.post(`${API_HOST}api/todos`, newTodo);

        todos = [...todos,res.data];

        this.setState({
          todos,
          todo: "",
          searchText: "",
          isSearching: false,
          isEditing: null
        });
      }
    }
  };

  deleteHandler = uid => {
    let todos = this.state.todos.filter(todo => todo.id !== uid);

    let searchItems = this.state.searchItems.filter(todo => todo.id !== uid);

    this.setState({ todos, searchItems });
  };

  checkHandler = uid => {
    let todos = this.state.todos.map(todo =>
      todo.id === uid
        ? {
            ...todo,
            isDone: !todo.isDone
          }
        : todo
    );

    let searchItems = this.state.searchItems.map(todo =>
      todo.id === uid
        ? {
            ...todo,
            isDone: !todo.isDone
          }
        : todo
    );

    this.setState({ todos, searchItems });
  };

  staredHandler = uid => {
    let todos = this.state.todos.map(todo =>
      todo.id === uid
        ? {
            ...todo,
            isStared: !todo.isStared
          }
        : todo
    );

    let searchItems = this.state.searchItems.map(todo =>
      todo.id === uid
        ? {
            ...todo,
            isStared: !todo.isStared
          }
        : todo
    );

    this.setState({ todos, searchItems });
  };

  handleSearch = e => {
    e.preventDefault();
    let { value } = e.target;

    if (value && value.trim().length) {
      let { todos } = this.state;

      let regEx = new RegExp(value, "ig");
      let searchItems = todos && todos.filter(d => regEx.test(d.data));

      searchItems = searchItems.map(todo => ({
        ...todo,
        data: todo.data.replace(
          regEx,
          searchText => `<span class="searched-text">${searchText}</span>`
        )
      }));
      this.setState({
        searchItems,
        isSearching: true,
        todo: ""
      });
    } else {
      this.setState({
        isSearching: false
      });
    }
    this.setState({
      searchText: value
    });
  };

  handlerTaskType = ({ currentTarget: { innerText } }) => {
    this.setState({
      currentTaskType: innerText
    });
  };

  render() {
    let {
      todos,
      todo,
      isSearching,
      searchItems,
      searchText,
      currentTaskType,
      isEditing
    } = this.state;

    let todoList = isSearching ? searchItems : todos;

    if (currentTaskType === "Favourite") {
      todoList = todoList.filter(todo => todo.isStared);
    } else if (currentTaskType === "Completed") {
      todoList = todoList.filter(todo => todo.isDone);
    } else if (currentTaskType === "Pending") {
      todoList = todoList.filter(todo => !todo.isDone);
    }
    return (
      <>
        <Header
          searchText={searchText}
          handleSearch={this.handleSearch}
          isSearching={isSearching}
        />
        <div className="container">
          <div className="todo-container">
            <form onSubmit={this.handleSubmit}>
              <div className="todo-input">
                <input
                  type="text"
                  value={todo}
                  name="todo"
                  onChange={this.handleChange}
                  autoComplete="off"
                  className={isEditing ? "edit" : null}
                />
                <input type="submit" value={isEditing ? "Edit" : "Add"} />
              </div>
            </form>

            <div className="main-wrapper clearfix">
              <TaskType
                currentTaskType={currentTaskType}
                handlerTaskType={this.handlerTaskType}
              />
              <div className="todo-list">
                <h2>{currentTaskType}</h2>
                {todoList && todoList.length ? (
                  todoList.map(todo => (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      checkHandler={this.checkHandler}
                      staredHandler={this.staredHandler}
                      deleteHandler={this.deleteHandler}
                      handleUpdate={this.handleUpdate}
                    />
                  ))
                ) : (
                  <div className="no-todo">There is no todo</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withLoader(App);
