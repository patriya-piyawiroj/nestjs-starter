import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksRepository {
  logger = new Logger('TasksRepository');
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    };
    await this.repository.save(task);
    return task;
  }

  async updateTask(
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { id, status } = updateTaskStatusDto;
    const task = await this.getById(id, user);
    task.status = status;
    await this.repository.save(task);
    return task;
  }

  async getById(id: string, user: User): Promise<Task> {
    const found = await this.repository.findOneBy({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  async deleteById(id: string, user: User): Promise<void> {
    const result = await this.repository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User) {
    const { search, status } = filterDto;
    const query = this.repository.createQueryBuilder('task');
    query.where({ user });
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `${search}` },
      );
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    try {
      const task = query.getMany();
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to get task for error "${user.username}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
