import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Injectable()
export class MovieService {
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

  // Lấy tất cả phim
  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  createMovie(createMovieDto: CreateMovieDto): Movie {
    const movie: Movie = {
      id: this.movies.length + 1,
      name: createMovieDto.name,
      fromDate: createMovieDto.fromDate,
      toDate: createMovieDto.toDate,
      is18Plus: createMovieDto.is18Plus,
    };
    this.movies.push(movie);
    return movie;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto): Movie {
    const movie = this.getMovieById(id);
    const updatedMovie: Movie = { ...movie, ...updateMovieDto };

    this.movies = this.movies.map((movie) =>
      movie.id === id ? updatedMovie : movie,
    );
    return updatedMovie;
  }

  deleteMovie(id: number): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }
}
