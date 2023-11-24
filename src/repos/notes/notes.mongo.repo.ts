import { Note } from '../../entities/note';
import { NoteModel } from './notes.mongo.model.js';
import { Repository } from '../repo.js';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../users/users.mongo.repo.js';
import mongoose from 'mongoose';

const debug = createDebug('W7E:notes:mongo:repo');

export class NotesMongoRepo implements Repository<Note> {
  userRepo: UsersMongoRepo;
  constructor() {
    this.userRepo = new UsersMongoRepo();
    debug('Instantiated');
  }

  async getAll(): Promise<Note[]> {
    const result = await NoteModel.find()
      .populate('author', {
        notes: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Note> {
    const result = await NoteModel.findById(id)
      .populate('author', {
        notes: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key: keyof Note;
    value: any;
  }): Promise<Note[]> {
    const result = await NoteModel.find({ [key]: value })
      .populate('author', {
        notes: 0,
      })
      .exec();

    return result;
  }

  async create(newItem: Omit<Note, 'id'>): Promise<Note> {
    const userID = newItem.author.id;
    const user = await this.userRepo.getById(userID);
    const result: Note = await NoteModel.create({ ...newItem, author: userID });
    user.notes.push(result);
    await this.userRepo.update(userID, user);
    return result;
  }

  async update(id: string, updatedItem: Partial<Note>): Promise<Note> {
    const result = await NoteModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    })
      .populate('author', {
        notes: 0,
      })
      .exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await NoteModel.findByIdAndDelete(id)
      .populate('author', {
        notes: 0,
      })
      .exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    const userID = result.author.id;
    const user = await this.userRepo.getById(userID);
    // Temp const deletedNoteID = new mongoose.mongo.ObjectId(id);
    user.notes = user.notes.filter((item) => {
      const itemID = item as unknown as mongoose.mongo.ObjectId;
      return itemID.toString() !== id; // Temp deletedNoteID.toString();
    });
    await this.userRepo.update(userID, user);
  }
}
