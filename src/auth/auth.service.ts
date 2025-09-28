import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = await bcrypt.hash(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { userEmail: loginUserDto.userEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.userId,          // ID estándar en JWT
      email: user.userEmail,
      userRoles: user.userRoles,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = await bcrypt.hash(updateUserDto.userPassword, 5);
    }

    const newUserData = await this.userRepository.preload({
      userId,
      ...updateUserDto,
    });

    if (!newUserData) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    return this.userRepository.save(newUserData);
  }

  async updateUserByEmail(userEmail: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { userEmail } });
    if (!user) {
      throw new NotFoundException(`Usuario con email ${userEmail} no encontrado`);
    }

    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = await bcrypt.hash(updateUserDto.userPassword, 5);
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }
}
