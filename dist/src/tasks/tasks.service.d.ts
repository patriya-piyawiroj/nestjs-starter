import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';
import { PrismaService } from './prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
export declare class TasksService {
    private tasksRespository;
    private noteRepository;
    constructor(tasksRespository: TasksRepository, noteRepository: PrismaService);
    createNote(createNoteDto: CreateNoteDto): Promise<void>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: string, user: User): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<void>;
    updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto, user: User): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
}
