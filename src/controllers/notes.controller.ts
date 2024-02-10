import { NextFunction, Request, Response } from 'express';

import { Repository } from '../repos/repo';
import { Note } from '../entities/note';
import createDebug from 'debug';
import { Controller } from './controller.js';

const debug = createDebug('W7E:notes:controller');

export class NotesController extends Controller<Note> {
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<Note>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
