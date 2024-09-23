import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { FloorModule } from 'src/floor/floor.module';
import { ParkingSlotModule } from 'src/parking-slot/parking-slot.module';
import { PanelModule } from 'src/panel/panel.module';
import { GridModule } from 'src/grid/grid.module';

@Module({
  imports: [FloorModule, ParkingSlotModule, PanelModule, GridModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
