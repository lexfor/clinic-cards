import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { CardService } from '../services/card.service';
import { CardEntity } from '../entity/card.entity';
import { UpdateCardFormDto } from '../dto/form/update-card.form.dto';
import { FullCardViewDto } from '../dto/view/full-card.view.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCard(@Req() req): Promise<CardEntity> {
    return await this.cardService.getCard(req.user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateCard(@Req() req, @Body() dto: UpdateCardFormDto): Promise<void> {
    await this.cardService.updateCard(req.user.id, dto);
  }

  @Get('patient/:id/full')
  @UseGuards(JwtAuthGuard)
  async getFullCard(
    @Param('id') id: string,
    @Request() req,
  ): Promise<FullCardViewDto> {
    if (req.user.role === 'doctor') {
      return await this.cardService.getPatientCard(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
