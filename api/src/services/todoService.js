import Boom from '@hapi/boom';

import Todo from '../models/todo';

/**
 * Get all todos.
 *
 * @returns {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

/**
 * Get a todo.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getTodo(id) {
  return new Todo({ id })
    .fetch()
    .then(todo => todo)
    .catch(Todo.NotFoundError, () => {
      throw Boom.notFound('Todo not found');
    });
}

/**
 * Create new todo.
 *
 * @param   {Object}  todo
 * @returns {Promise}
 */
export function createTodo(todo) {
  return new Todo({ data: todo.data,isDone:todo.isDone }).save();
}

/**
 * Update a todo.
 *
 * @param   {Number|String}  id
 * @param   {Object}         todo
 * @returns {Promise}
 */
export function updateTodo(id, todo) {
  return new Todo({ id }).save({ data: todo.data });
}

/**
 * Delete a todo.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => todo.destroy());
}
