import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  providers: [FloorService],
  exports: [FloorService],
})
export class FloorModule {}
