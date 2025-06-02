import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}

// Actor:
// Tìm kiếm danh sách phim của diễn viên X
// Cần 1 hàm để tìm phim theo ID --> MovieService.getMovieById(id)

// ActorModule --> MovieService

// MovieActor:
// movieId
// actorID

// 1. Dùng dạng SQL thuần

// 2. TypeORM: Định nghĩa mối quan hệ --> Sinh bảng tự động
// @ManyToMany
