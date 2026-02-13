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
} from '@nestjs/common';
import { CreateThemeDto, FearLevel, UpdateThemeDto } from '@lets-escape/shared';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  async findAll(
    @Query('district') district?: string,
    @Query('minPlayers') minPlayers?: string,
    @Query('maxPlayers') maxPlayers?: string,
    @Query('fear') fear?: FearLevel,
    @Query('playTimeMin') playTimeMin?: string,
    @Query('playTimeMax') playTimeMax?: string,
    @Query('q') q?: string,
  ) {
    return this.themesService.findAll({
      district,
      minPlayers: minPlayers ? Number(minPlayers) : undefined,
      maxPlayers: maxPlayers ? Number(maxPlayers) : undefined,
      fear,
      playTimeMin: playTimeMin ? Number(playTimeMin) : undefined,
      playTimeMax: playTimeMax ? Number(playTimeMax) : undefined,
      q,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.themesService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateThemeDto) {
    return this.themesService.create(payload);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateThemeDto,
  ) {
    return this.themesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.themesService.remove(id);
  }
}
