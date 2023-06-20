"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
const prisma_service_1 = require("./prisma.service");
let TasksService = exports.TasksService = class TasksService {
    constructor(tasksRespository, noteRepository) {
        this.tasksRespository = tasksRespository;
        this.noteRepository = noteRepository;
    }
    async createNote(createNoteDto) {
        const { note } = createNoteDto;
        await this.noteRepository.notes.create({
            data: { note },
        });
    }
    async createTask(createTaskDto, user) {
        return this.tasksRespository.createTask(createTaskDto, user);
    }
    async getTaskById(id, user) {
        return this.tasksRespository.getById(id, user);
    }
    async deleteTaskById(id, user) {
        await this.tasksRespository.deleteById(id, user);
    }
    async updateTaskStatus(updateTaskStatusDto, user) {
        return await this.tasksRespository.updateTask(updateTaskStatusDto, user);
    }
    async getTasks(filterDto, user) {
        return this.tasksRespository.getTasks(filterDto, user);
    }
};
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TasksRepository,
        prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map