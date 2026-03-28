import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  //register
  async create(registerDto: RegisterDto) {
    //check user exist
    const userExist = await this.prismaService.user.findUnique({
      where: { email: registerDto.email },
    });

    if (userExist) {
      throw new NotFoundException('User aleady exists!');
    }

    // hash password
    const hashPass = await bcrypt.hash(registerDto.password, 10);

    // extract user

    // create user
    await this.prismaService.user.create({
      data: {
        ...registerDto,
        password: hashPass,
      },
    });

    return {
      message: 'User created succesful',
    };
  }

  //login
  async login(loginDto: LoginDto) {
    //check user existence
    const userExist = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }

    //verify password
    const passwordCheck = await bcrypt.compare(
      loginDto.password,
      userExist.password,
    );

    if (!passwordCheck) throw new NotFoundException('Password is wrong');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, role, id, ...user } = userExist;

    const token = this.jwtService.sign({ id, role });

    return {
      message: 'Login Succesfull',
      user,
      token,
    };
  }
}
