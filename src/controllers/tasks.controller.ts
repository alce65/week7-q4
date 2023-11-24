import createDebug from 'debug';
import { Repository } from '../repos/repo';
import { Task } from '../entities/task';
import { Controller } from './controller';

const debug = createDebug('W7E:tasks:controller');

export class TasksController extends Controller<Task> {
  constructor(protected repo: Repository<Task>) {
    super(repo);
    debug('Instantiated');
  }
}
