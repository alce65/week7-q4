import fs from 'fs/promises';
import { Task } from '../entities/task';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:tasks:file:repo');

export class TasksFileRepo implements Repository<Task> {
  file: string;
  tasks: Task[];
  constructor() {
    debug('Instantiated');
    this.file = './data/tasks.json';
    this.tasks = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.tasks = JSON.parse(data);
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }

  async getById(id: string): Promise<Task> {
    const result = this.tasks.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  search({ _key, _value }: { _key: string; _value: unknown }): Promise<Task[]> {
    // Temp this.tasks.find((item) => item[_key] === _value)
    throw new Error('Method not implemented.');
  }

  async create(newItem: Omit<Task, 'id'>): Promise<Task> {
    const result: Task = { ...newItem, id: crypto.randomUUID() };
    const newTasks = [...this.tasks, result];
    await this.save(newTasks as Task[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Task>): Promise<Task> {
    let result = this.tasks.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Task;
    const newTasks = this.tasks.map((item) => (item.id === id ? result : item));
    await this.save(newTasks as Task[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.tasks.filter((item) => item.id !== id);
    if (newTasks.length === this.tasks.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newTasks: Task[]) {
    await fs.writeFile(this.file, JSON.stringify(newTasks), {
      encoding: 'utf-8',
    });
    this.tasks = newTasks;
  }
}
