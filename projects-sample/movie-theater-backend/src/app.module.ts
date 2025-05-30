import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [],
  controllers: [AppController, MovieController],
  providers: [AppService, MovieService],
})
export class AppModule {}
