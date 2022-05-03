import { CacheModule, Module } from '@nestjs/common';
import {
  CreateCardHandlerUsecase,
  DeleteCardHandlerUsecase,
} from './usecase/handlers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { poolFactory } from '../../factories/database.factory';
import { CardRepository } from './entity/card.repository';
import { CardMapper } from './mappers/card.mapper';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { CardFetcher } from './view/card.fetcher';
import { UpdateCardHandlerUsecase } from './usecase/handlers/update-card.handler.usecase';

const commandHandlers = [
  CreateCardHandlerUsecase,
  DeleteCardHandlerUsecase,
  UpdateCardHandlerUsecase,
];

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), CqrsModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'CARD_REPOSITORY',
      useClass: CardRepository,
    },
    {
      provide: 'CARD_FETCHER',
      useClass: CardFetcher,
    },
    CardMapper,
    CardService,
    ...commandHandlers,
  ],
  controllers: [CardController],
  exports: [CardMapper],
})
export class CardModule {}
