import { Inject, Injectable } from '@nestjs/common';
import { ICardFetcher } from '../interfaces/fetcher.interface';
import { CardMapper } from '../mappers/card.mapper';
import { CardEntity } from '../entity/card.entity';
import {
  FullCardViewDto,
  ResolutionData,
} from '../dto/view/full-card.view.dto';

@Injectable()
export class CardFetcher implements ICardFetcher {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: CardMapper,
  ) {}

  async getCard(userID: string): Promise<CardEntity> {
    const sql = `SELECT * FROM cards
                    INNER JOIN users ON users.id = cards.user_id
                    WHERE users.credential_id = $1`;
    const { rows } = await this.pool.query(sql, [userID]);
    const [data] = rows;
    return this.mapper.toEntity(data);
  }

  async getPatientCard(id: string): Promise<FullCardViewDto> {
    const sql = `SELECT 
                    cards.intolerances,
                    cards.height,
                    cards.weight,
                    cards.blood_type,
                    users.first_name,
                    users.last_name,
                    users.birthday
                    FROM cards
                    INNER JOIN users ON cards.user_id =  users.id
                    WHERE users.id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    const [card] = rows;
    return card;
  }

  async getPatientCardDiagnosis(id: string): Promise<ResolutionData[]> {
    const sql = `SELECT 
                    users.first_name,
                    users.last_name,
                    appointments.date,
                    appointments.complaints,
                    resolutions.diagnosis,
                    resolutions.purpose
                    FROM resolutions
                    INNER JOIN appointments ON resolutions.appointment_id = appointments.id
                    INNER JOIN users ON users.id = appointments.patient_id
                    WHERE users.id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    return rows;
  }
}
