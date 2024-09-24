import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { Panel } from './entities/panel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorModule } from 'src/floor/floor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Panel]), FloorModule],
  providers: [PanelService],
  exports: [PanelService],
})
export class PanelModule {}
