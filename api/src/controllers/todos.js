import HttpStatus from 'http-status-codes';

import * as todoService from '../services/todoService';

/**
 * Get all todos.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  todoService
    .getAllTodos()
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Get a todo by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Create a new todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  todoService
    .createTodo(req.body)
    .then(data => res.status(HttpStatus.CREATED).json(data))
    .catch(err => next(err));
}

/**
 * Update a todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Delete a todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteTodo(req, res, next) {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}
