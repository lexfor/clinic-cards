import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class CardEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly intolerances: string;
  @ApiProperty()
  private readonly height: number;
  @ApiProperty()
  private readonly weight: number;
  @ApiProperty()
  private readonly bloodyType: string;
  @ApiProperty()
  private readonly userID: string;

  constructor(
    id: string,
    userID: string,
    intolerances?: string,
    height?: number,
    weight?: number,
    bloodyType?: string,
  ) {
    this.id = id;
    this.intolerances = intolerances;
    this.height = height;
    this.weight = weight;
    this.bloodyType = bloodyType;
    this.userID = userID;
  }

  get getID(): string {
    return this.id;
  }

  get getIntolerances(): string {
    return this.intolerances;
  }

  get getHeight(): number {
    return this.height;
  }

  get getWeight(): number {
    return this.weight;
  }

  get getBloodyType(): string {
    return this.bloodyType;
  }

  get getUserID(): string {
    return this.userID;
  }
}
