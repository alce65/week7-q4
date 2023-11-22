import { NotesMongoRepo } from './notes.mongo.repo';
import { NoteModel } from './notes.mongo.model.js';

jest.mock('./notes.mongo.model.js');

describe('Given NotesMongoRepo', () => {
  let repo: NotesMongoRepo;
  describe('When we isntantiate it without errors', () => {
    const exec = jest.fn().mockResolvedValue('Test');
    beforeEach(() => {
      NoteModel.find = jest.fn().mockReturnValue({
        exec,
      });

      NoteModel.findById = jest.fn().mockReturnValue({
        exec,
      });
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
  });

  describe('When we isntantiate it WITH errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Test'));
    beforeEach(() => {
      NoteModel.findById = jest.fn().mockReturnValue({
        exec,
      });
      repo = new NotesMongoRepo();
    });

    test('Then it should execute getById', async () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
