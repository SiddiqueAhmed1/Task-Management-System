import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
