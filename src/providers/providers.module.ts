import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Provider} from './entities/provider.entity'
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from 'src/auth/constants/jwt.constants';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Provider]), AuthModule, JwtModule.register({
    secret: JWT_KEY,
    signOptions: {
      expiresIn: EXPIRES_IN,
    }
  })],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
