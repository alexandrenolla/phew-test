import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { Grid } from './entities/grid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Grid])],
  providers: [GridService],
  exports: [GridService],
})
export class GridModule {}
