import createDebug from 'debug';
import { Repository } from '../repo';
import { LoginUser, User } from '../../entities/user.js';
import { UserModel } from './users.mongo.model.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('W7E:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    if (!result || result.passwd !== loginUser.passwd)
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  getById(_id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  update(_id: string, _updatedItem: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
