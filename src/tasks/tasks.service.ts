import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';
import { PrismaService } from './prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class TasksService {
  constructor(
    private tasksRespository: TasksRepository,
    private noteRepository: PrismaService,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<void> {
    const { note } = createNoteDto;
    await this.noteRepository.notes.create({
      data: { note },
    });
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRespository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRespository.getById(id, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    await this.tasksRespository.deleteById(id, user);
  }

  async updateTaskStatus(
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    return await this.tasksRespository.updateTask(updateTaskStatusDto, user);
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRespository.getTasks(filterDto, user);
  }
}
