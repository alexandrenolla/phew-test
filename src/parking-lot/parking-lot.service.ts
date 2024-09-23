import { Injectable } from '@nestjs/common';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { Repository } from 'typeorm';
import { ParkingSlotService } from 'src/parking-slot/parking-slot.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { ParkingTicketService } from 'src/parking-ticket/parking-ticket.service';
import { VehicleType } from 'src/vehicle/enums/vehicle-type.enum';
import { ParkingTicket } from 'src/parking-ticket/entities/parking-ticket.entity';

@Injectable()
export class ParkingLotService {
  constructor(
    @InjectRepository(ParkingLot)
    private parkingLotRepository: Repository<ParkingLot>,
    private parkingSlotService: ParkingSlotService,
    private vehicleService: VehicleService,
    private parkingTicketService: ParkingTicketService,
  ) {}

  async parkVehicle(
    licensePlate: string,
    vehicleType: VehicleType,
  ): Promise<ParkingTicket> {
    const availableSlot =
      await this.parkingSlotService.findAvailableSlot(vehicleType);

    const vehicle = await this.vehicleService.create(licensePlate, vehicleType);

    const ticket = await this.parkingTicketService.create(
      availableSlot,
      vehicle,
    );

    return ticket;
  }

  async exitVehicle(ticketId: number): Promise<ParkingTicket> {
    return await this.parkingTicketService.exitVehicle(ticketId);
  }
}
