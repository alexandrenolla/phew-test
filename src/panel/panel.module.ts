import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { Panel } from './entities/panel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Panel])],
  providers: [PanelService],
  exports: [PanelService],
})
export class PanelModule {}
