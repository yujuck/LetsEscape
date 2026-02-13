import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from '@lets-escape/shared';
import { CurrentUser } from '../../common/decorators';
import { SupabaseAuthGuard } from '../../common/guards';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findAll(@Query('themeId') themeId?: string) {
    return this.reviewsService.findAll(themeId ? Number(themeId) : undefined);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('my')
  async findMy(@CurrentUser() user: { id: string }) {
    return this.reviewsService.findMy(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }

  @UseGuards(SupabaseAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body() payload: CreateReviewDto,
  ) {
    return this.reviewsService.create(user.id, payload);
  }

  @UseGuards(SupabaseAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
    @Body() payload: UpdateReviewDto,
  ) {
    return this.reviewsService.update(id, user.id, payload);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { id: string },
  ) {
    return this.reviewsService.remove(id, user.id);
  }
}
