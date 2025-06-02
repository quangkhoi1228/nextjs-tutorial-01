import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  // Lấy tất cả phim
  async getAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = {
      id: 0,
      name: createMovieDto.name,
      fromDate: createMovieDto.fromDate,
      toDate: createMovieDto.toDate,
      is18Plus: createMovieDto.is18Plus,
    };
    return await this.movieRepository.save(movie);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.getMovieById(id);
    const updatedMovie: Movie = { ...movie, ...updateMovieDto };
    return await this.movieRepository.save(updatedMovie);
  }

  async deleteMovie(id: number): Promise<boolean> {
    const result = await this.movieRepository.delete(id);
    return result.affected > 0;
  }
}
