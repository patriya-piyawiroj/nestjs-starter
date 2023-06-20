import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Logger } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';
export declare class TasksRepository {
    private repository;
    logger: Logger;
    constructor(repository: Repository<Task>);
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    updateTask(updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task>;
    getById(id: string, user: User): Promise<Task>;
    deleteById(id: string, user: User): Promise<void>;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
}
