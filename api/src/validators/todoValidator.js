import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as todoService from '../services/todoService';

// Validation schema
const schema = Joi.object({
  data: Joi.string()
    .label('data')
    .max(200)
    .required(),
  isDone: Joi.boolean().required(),
  isStared: Joi.boolean()
});

/**
 * Validate create/update todo request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function todoValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate todos existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findTodo(req, res, next) {
  return todoService
    .getTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findTodo, todoValidator };
