import { Router as createRouter } from 'express';
import { TasksController } from '../controllers/tasks.controller.js';
import createDebug from 'debug';

const debug = createDebug('W7E:tasks:router');

export const tasksRouter = createRouter();
debug('Starting');

const controller = new TasksController();

tasksRouter.get('/', controller.getAll.bind(controller));
tasksRouter.get('/search', controller.search.bind(controller));
tasksRouter.get('/:id', controller.getById.bind(controller));
tasksRouter.post('/', controller.create.bind(controller));
tasksRouter.patch('/:id', controller.update.bind(controller));
tasksRouter.patch('addUser/:id', controller.update.bind(controller));
tasksRouter.patch('removeUser/:id', controller.update.bind(controller));
tasksRouter.delete('/:id', controller.delete.bind(controller));
