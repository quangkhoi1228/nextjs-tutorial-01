import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  NotFoundException,
  Param,
  Delete,
} from '@nestjs/common';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Controller('movie')
export class MovieController {
  private movies: Movie[] = [
    {
      id: 1,
      name: 'The Dark Knight',
      fromDate: new Date('2025-01-01'),
      toDate: new Date('2025-01-01'),
      is18Plus: false,
    },
    {
      id: 2,
      name: 'Tấm cám',
      fromDate: new Date('2025-01-01'),
      toDate: new Date('2025-01-01'),
      is18Plus: true,
    },
  ];

  // Lấy dữ liệu phim
  @Get()
  getMovies(): Movie[] {
    return this.movies;
  }

  @Get(':id')
  getMovie(@Param('id') id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === Number(id));
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto): Movie {
    const newMovie: Movie = {
      id: this.movies.length + 1,
      name: createMovieDto.name,
      fromDate: createMovieDto.fromDate,
      toDate: createMovieDto.toDate,
      is18Plus: createMovieDto.is18Plus,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  @Put(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Movie {
    let movie = this.movies.find((movie) => movie.id === Number(id));

    console.log(id, movie);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie = { ...movie, ...updateMovieDto };

    /*

  {} -->  {
        "id": 2,
        "name": "Tấm cám",
        "fromDate": "2025-01-01T00:00:00.000Z",
        "toDate": "2025-01-01T00:00:00.000Z",
        "is18Plus": true
    }

    --> {
        "id": 2,
        "name": "Tấm cám",
        "fromDate": "2025-01-01T00:00:00.000Z",
        "toDate": "2025-01-01T00:00:00.000Z",
        "is18Plus": false
    }

    */
    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string): boolean {
    // Xoá: đối với mảng thì tạo mảng mới mà không có phần tử cần xoá

    // [1,2,3 ] người dùng cần xoá cái số 2 --> [1, 3]
    this.movies = this.movies.filter((movie) => movie.id !== Number(id));

    return true;
  }
}
