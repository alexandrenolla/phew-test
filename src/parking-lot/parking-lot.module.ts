import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLot } from './entities/parking-lot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotModule } from 'src/parking-slot/parking-slot.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ParkingTicketModule } from 'src/parking-ticket/parking-ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingLot]),
    ParkingSlotModule,
    VehicleModule,
    ParkingTicketModule,
  ],
  providers: [ParkingLotService],
})
export class ParkingLotModule {}
