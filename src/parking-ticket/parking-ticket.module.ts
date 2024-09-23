import { Module } from '@nestjs/common';
import { ParkingTicketService } from './parking-ticket.service';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotModule } from 'src/parking-slot/parking-slot.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingTicket]), ParkingSlotModule],
  providers: [ParkingTicketService],
  exports: [ParkingTicketService],
})
export class ParkingTicketModule {}
