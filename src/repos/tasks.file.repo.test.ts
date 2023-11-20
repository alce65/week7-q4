import { TasksFileRepo } from './tasks.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given TasksFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new TasksFileRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
  });
});
