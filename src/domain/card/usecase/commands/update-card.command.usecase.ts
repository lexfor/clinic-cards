import { UpdateCardFormDto } from '../../dto/form/update-card.form.dto';

export class UpdateCardCommandUsecase {
  intolerances?: string;

  height?: number;

  weight?: number;

  bloodType?: string;

  userID: string;

  constructor(userID: string, dto: UpdateCardFormDto) {
    this.intolerances = dto.intolerances;
    this.height = dto.height;
    this.weight = dto.weight;
    this.bloodType = dto.bloodType;
    this.userID = userID;
  }
}
