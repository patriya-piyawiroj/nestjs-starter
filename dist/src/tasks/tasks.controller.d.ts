import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateNoteDto } from './dto/create-note.dto';
export declare class TasksController {
    private tasksService;
    private configService;
    private logger;
    constructor(tasksService: TasksService, configService: ConfigService);
    getTasks(user: User, filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(user: User, id: string): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<void>;
    createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task>;
    createNote(note: CreateNoteDto): Promise<void>;
    updateTaskStatus(id: string, user: User, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task>;
}
