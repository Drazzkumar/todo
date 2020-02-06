import React from "react";
// import PropTypes from "prop-type"

function Todo({
  todo,
  deleteHandler,
  handleUpdate,
  checkHandler,
  staredHandler
}) {
  return (
    <div className="todo clearfix">
      <div className="todo-item">
        <i
          className={todo.isStared ? "fa fa-star stared" : "fa fa-star"}
          aria-hidden="true"
          onClick={() => staredHandler(todo.id)}
        />
        <input
          type="checkbox"
          id="status"
          checked={todo.isDone}
          onChange={() => checkHandler(todo.id)}
        />
        <div
          className={todo.isDone ? "todo-text done" : "todo-text"}
          dangerouslySetInnerHTML={{ __html: todo.data }}
        />
      </div>
      <div className="actions">
        <i className="fa fa-edit" onClick={() => handleUpdate(todo.id)} />
        <i className="fa fa-times" onClick={() => deleteHandler(todo.id)} />
      </div>
    </div>
  );
}

// Todo.propTypes = {
//   todo: PropTypes.object,
//   deleteHandler: PropTypes.func,
//   checkHandler: PropTypes.func
// };

export default Todo;
