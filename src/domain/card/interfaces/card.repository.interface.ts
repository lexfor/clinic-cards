import { ICard } from './card.interface';
import { CardEntity } from '../entity/card.entity';

export interface ICardRepository {
  getCard: (userID: string) => Promise<CardEntity>;
  createCard: (card: ICard) => Promise<CardEntity>;
  updateCard: (card: ICard) => Promise<CardEntity>;
  deleteCard: (userID: string) => Promise<void>;
}
