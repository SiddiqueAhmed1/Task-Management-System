import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy, JwtGuard],
})
export class TasksModule {}
