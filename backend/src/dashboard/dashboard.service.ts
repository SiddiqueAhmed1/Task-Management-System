import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private databaseService: PrismaService) {}

  async getStats(userId: string) {
    const totalProjects = await this.databaseService.project.count({
      where: { userId },
    });

    const totalTask = await this.databaseService.task.count({
      where: { project: { userId } },
    });

    const completedTask = await this.databaseService.task.count({
      where: { project: { userId }, status: 'COMPLETED' },
    });

    return {
      totalProjects,
      totalTask,
      completedTask,
      pendingTask: totalTask - completedTask,
    };
  }
}
