import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private databaseService: PrismaService) {}
  async create(createTaskDto: CreateTaskDto, userId: string) {
    // check user's access on this project
    const project = await this.databaseService.project.findUnique({
      where: {
        id: createTaskDto.projectId,
        userId: userId,
      },
    });

    if (!project) {
      throw new ForbiddenException("Don't have access");
    }

    const task = await this.databaseService.task.create({
      data: {
        ...createTaskDto,
        name: createTaskDto.name,
        projectId: createTaskDto.projectId,
      },
    });

    return {
      message: 'Task created succesfully',
      task,
    };
  }

  // find all
  findAll() {
    return this.databaseService.task.findMany({});
  }

  async findOne(id: string) {
    const task = await this.databaseService.task.findUnique({
      where: {
        id,
      },
    });
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updateTask = await this.databaseService.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    return {
      message: 'Task updated succesfully',
      updateTask,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
