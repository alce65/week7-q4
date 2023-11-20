import { Request, Response } from 'express';
import { TasksController } from './tasks.controller';
import { TasksFileRepo } from '../repos/tasks.file.repo';

describe('Given TasksController class', () => {
  describe('When we instantiate it', () => {
    test('Then getAll should ...', async () => {
      TasksFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new TasksController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });
});
