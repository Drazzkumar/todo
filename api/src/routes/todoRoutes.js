import { Router } from 'express';

import * as todoController from '../controllers/todos';
import { findTodo, todoValidator } from '../validators/todoValidator';

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', todoController.fetchAll);

/**
 * GET /api/todos/:id
 */
router.get('/:id', todoController.fetchById);

/**
 * POST /api/todos
 */
router.post('/', todoValidator, todoController.create);

/**
 * PUT /api/todos/:id
 */
router.put('/:id', findTodo, todoValidator, todoController.update);

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, todoController.deleteTodo);

export default router;
