import { Router as createRouter } from 'express';
import { NotesController } from '../controllers/notes.controller.js';
import createDebug from 'debug';
import { NotesMongoRepo } from '../repos/notes/notes.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W7E:notes:router');

export const notesRouter = createRouter();
debug('Starting');

const repo = new NotesMongoRepo();
const controller = new NotesController(repo);
const interceptor = new AuthInterceptor();

notesRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
);
notesRouter.get('/search', controller.search.bind(controller));
notesRouter.get('/:id', controller.getById.bind(controller));
notesRouter.post(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.create.bind(controller)
);
notesRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationNotes.bind(interceptor),
  controller.update.bind(controller)
);
notesRouter.delete(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authenticationNotes.bind(interceptor),
  controller.delete.bind(controller)
);
