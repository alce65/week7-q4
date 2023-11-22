import { Note } from '../../entities/note';
import { NoteModel } from './notes.mongo.model.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:notes:mongo:repo');

export class NotesMongoRepo implements Repository<Note> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Note[]> {
    const result = await NoteModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<Note> {
    const result = await NoteModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Note[]> {
    // Temp this.notes.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Note, 'id'>): Promise<Note> {
    const result: Note = await NoteModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Note>): Promise<Note> {
    const result = await NoteModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await NoteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
