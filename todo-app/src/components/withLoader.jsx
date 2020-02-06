import React from "react";
import Loader from "./Loader";
import { API_HOST } from "../helpers/constants";

export default App => {
  class withLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: null,
        isLoadingComplete: false
      };
    }

    componentDidMount = () => {
      const todoURL = `${API_HOST}api/todos`;
      fetch(todoURL)
        .then(d => d.json())
        .then(todos => {
          console.log(todos);
          this.setState({ todos, isLoadingComplete: true });
        })
        .catch(e => {
          console.log(e);
          this.setState({ isLoadingComplete: true });
        });
    };

    render() {
      let { todos, isLoadingComplete } = this.state;
      return isLoadingComplete ? <App todos={todos} /> : <Loader />;
    }
  }

  return withLoader;
};
