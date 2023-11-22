import { Router as createRouter } from 'express';
import { TasksController } from '../controllers/tasks.controller.js';
import createDebug from 'debug';
import { TasksFileRepo } from '../repos/tasks/tasks.file.repo.js';

const debug = createDebug('W7E:tasks:router');

export const tasksRouter = createRouter();
debug('Starting');

const repo = new TasksFileRepo();
const controller = new TasksController(repo);

tasksRouter.get('/', controller.getAll.bind(controller));
tasksRouter.get('/search', controller.search.bind(controller));
tasksRouter.get('/:id', controller.getById.bind(controller));
tasksRouter.post('/', controller.create.bind(controller));
tasksRouter.patch('/:id', controller.update.bind(controller));
tasksRouter.delete('/:id', controller.delete.bind(controller));
