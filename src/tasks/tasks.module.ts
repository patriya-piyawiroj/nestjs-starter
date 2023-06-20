import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ConfigModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, PrismaService],
})
export class TasksModule {}
