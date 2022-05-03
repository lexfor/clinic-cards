import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KafkaController } from './kafka.controller';
import { CardModule } from './domain/card/card.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateCardSaga } from './sagas/create/user';
import { DeleteCardSaga } from './sagas/delete/user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

const sagas = [CreateCardSaga, DeleteCardSaga];

@Module({
  imports: [
    CardModule,
    ConfigModule.forRoot(),
    CqrsModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [...sagas, JwtStrategy],
  controllers: [KafkaController],
})
export class AppModule {}
