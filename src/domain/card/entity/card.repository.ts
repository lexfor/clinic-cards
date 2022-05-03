import { Inject, Injectable } from '@nestjs/common';
import { ICardRepository } from '../interfaces/card.repository.interface';
import { CardMapper } from '../mappers/card.mapper';
import { ICard } from '../interfaces/card.interface';
import { CardEntity } from './card.entity';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: CardMapper,
  ) {}

  async createCard(card: ICard): Promise<CardEntity> {
    const sql = `INSERT INTO cards (id, intolerances, user_id) 
                 VALUES ($1, $2, $3);`;
    await this.pool.query(sql, [card.id, card.intolerances, card.user_id]);
    return this.mapper.toEntity(card);
  }

  async updateCard(card: ICard): Promise<CardEntity> {
    const sql = `UPDATE cards SET intolerances = $1, height = $2, weight = $3, blood_type = $4
                 WHERE id = $5;`;
    await this.pool.query(sql, [
      card.intolerances,
      card.height,
      card.weight,
      card.blood_type,
      card.id,
    ]);
    return this.mapper.toEntity(card);
  }

  async getCard(credentialID: string): Promise<CardEntity> {
    const sql = `SELECT cards.* FROM cards
                    INNER JOIN users ON users.id = cards.user_id
                    WHERE users.credential_id = $1;`;
    const { rows } = await this.pool.query(sql, [credentialID]);
    const [card] = rows;
    return this.mapper.toEntity(card);
  }

  async deleteCard(userID: string): Promise<void> {
    const sql = `DELETE FROM cards WHERE user_id = $1;`;
    await this.pool.query(sql, [userID]);
  }
}
