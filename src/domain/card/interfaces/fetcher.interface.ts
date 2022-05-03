import { CardEntity } from '../entity/card.entity';
import {
  FullCardViewDto,
  ResolutionData,
} from '../dto/view/full-card.view.dto';

export interface ICardFetcher {
  getCard: (userID: string) => Promise<CardEntity>;
  getPatientCard: (id: string) => Promise<FullCardViewDto>;
  getPatientCardDiagnosis: (id: string) => Promise<ResolutionData[]>;
}
