import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // Lấy dữ liệu phim
  @Get()
  async getMovies(): Promise<Movie[]> {
    return await this.movieService.getAllMovies();
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.getMovieById(Number(id));
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(Number(id), updateMovieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<boolean> {
    return await this.movieService.deleteMovie(Number(id));
  }
}
