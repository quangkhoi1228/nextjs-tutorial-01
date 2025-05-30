import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // Lấy dữ liệu phim
  @Get()
  getMovies(): Movie[] {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  getMovie(@Param('id') id: string): Movie {
    return this.movieService.getMovieById(Number(id));
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Movie {
    return this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Movie {
    return this.movieService.updateMovie(Number(id), updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): boolean {
    return this.movieService.deleteMovie(Number(id));
  }
}
