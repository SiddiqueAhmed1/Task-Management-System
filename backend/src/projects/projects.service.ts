import { Injectable } from '@nestjs/common';
// import { CreateProjectDto } from './dto/create-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: PrismaService) {}

  // create project
  async create(createProjectDto: CreateProjectDto, userId: string) {
    const addtask = await this.databaseService.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        userId,
      },
    });
    return addtask;
  }

  // find all project
  async findAll() {
    const user = await this.databaseService.project.findMany({
      include: {
        user: true,
      },
    });
    return user;
  }

  // find single project
  async findOne(id: string) {
    const singleProject = await this.databaseService.project.findUnique({
      where: {
        id,
      },
    });

    if (!singleProject) {
      return {
        message: 'Project not found',
        name: null,
      };
    }

    return {
      message: `${singleProject.name} Project fetch succesfull`,
      singleProject,
    };
  }

  // update project
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updateProject = await this.databaseService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });

    return updateProject;
  }

  // delete project
  async remove(id: string) {
    const deletedProject = await this.databaseService.project.delete({
      where: {
        id,
      },
    });

    return deletedProject;
  }
}
