import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { FloorModule } from './floor/floor.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ParkingTicketModule } from './parking-ticket/parking-ticket.module';
import { ParkingSlotModule } from './parking-slot/parking-slot.module';
import { PanelModule } from './panel/panel.module';
import { AdminModule } from './admin/admin.module';
import { GridModule } from './grid/grid.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      inject: [DatabaseService],
    }),
    ParkingLotModule,
    FloorModule,
    VehicleModule,
    ParkingTicketModule,
    ParkingSlotModule,
    PanelModule,
    AdminModule,
    GridModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
