import { NotesMongoRepo } from './notes.mongo.repo';
import { NoteModel } from './notes.mongo.model.js';
import { Note } from '../../entities/note';
import { UsersMongoRepo } from '../users/users.mongo.repo';

jest.mock('./notes.mongo.model.js');

describe('Given NotesMongoRepo', () => {
  let repo: NotesMongoRepo;
  describe('When we instantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');
    beforeEach(() => {
      NoteModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      NoteModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      NoteModel.create = jest.fn().mockResolvedValue('Test');
      repo = new NotesMongoRepo();
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById('');
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute search', async () => {
      const result = await repo.search({ key: 'isImportant', value: true });
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute create', async () => {
      UsersMongoRepo.prototype.getById = jest.fn().mockResolvedValue({
        notes: [],
      });
      UsersMongoRepo.prototype.update = jest.fn();
      const result = await repo.create({ author: {} } as Omit<Note, 'id'>);
      expect(result).toBe('Test');
    });
  });

  describe('When we instantiate it WITH errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Test'));
    beforeEach(() => {
      NoteModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });
      repo = new NotesMongoRepo();
    });

    test('Then it should execute getById', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
