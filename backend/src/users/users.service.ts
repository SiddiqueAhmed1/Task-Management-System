import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private databaseService: PrismaService) {}

  // create user
  async create(createUserDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.databaseService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashPass,
        role: (createUserDto.role as any) || 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: 'User created succesfull',
      user,
    };
  }

  // get all user
  async findAll() {
    return await this.databaseService.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  // update single user
  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashPass = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : undefined;
    const user = await this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: hashPass,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: 'User updated succesfully',
      user,
    };
  }

  // delete single user
  async remove(id: string) {
    const user = await this.databaseService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (user.role === 'ADMIN') {
      throw new ForbiddenException('Cannnot delete admin user');
    }

    return this.databaseService.user.delete({ where: { id } });
  }
}
