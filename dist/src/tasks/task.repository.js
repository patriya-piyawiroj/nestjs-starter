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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let TasksRepository = exports.TasksRepository = class TasksRepository {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('TasksRepository');
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = {
            id: (0, uuid_1.v4)(),
            title,
            description,
            status: task_status_enum_1.TaskStatus.OPEN,
            user,
        };
        await this.repository.save(task);
        return task;
    }
    async updateTask(updateTaskStatusDto, user) {
        const { id, status } = updateTaskStatusDto;
        const task = await this.getById(id, user);
        task.status = status;
        await this.repository.save(task);
        return task;
    }
    async getById(id, user) {
        const found = await this.repository.findOneBy({ id, user });
        if (!found) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }
    async deleteById(id, user) {
        const result = await this.repository.delete({ id, user });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with id ${id} not found`);
        }
    }
    async getTasks(filterDto, user) {
        const { search, status } = filterDto;
        const query = this.repository.createQueryBuilder('task');
        query.where({ user });
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `${search}` });
        }
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        try {
            const task = query.getMany();
            return task;
        }
        catch (error) {
            this.logger.error(`Failed to get task for error "${user.username}"`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.TasksRepository = TasksRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TasksRepository);
//# sourceMappingURL=task.repository.js.map