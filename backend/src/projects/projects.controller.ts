import {
  Controller,
  Get,
  Body,
  UseGuards,
  Post,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
// import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    console.log('we are from project service', req.user);
    const userId = req.user.id;
    return this.projectsService.create(createProjectDto, userId);
  }

  @Get()
  @UseGuards(JwtGuard)
  @UseGuards(JwtGuard)
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
