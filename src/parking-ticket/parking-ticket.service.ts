import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParkingTicketDto } from './dto/create-parking-ticket.dto';
import { UpdateParkingTicketDto } from './dto/update-parking-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { Repository } from 'typeorm';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { ParkingSlotService } from 'src/parking-slot/parking-slot.service';

@Injectable()
export class ParkingTicketService {
  constructor(
    @InjectRepository(ParkingTicket)
    private parkingTicketRepository: Repository<ParkingTicket>,
    private parkingSlotService: ParkingSlotService,
  ) {}

  async create(availableSlot: ParkingSlot, vehicle: Vehicle) {
    const ticket = this.parkingTicketRepository.create({
      slot: availableSlot,
      vehicle,
    });
    return this.parkingTicketRepository.save(ticket);
  }

  async exitVehicle(ticketId: number): Promise<ParkingTicket> {
    const ticket = await this.parkingTicketRepository.findOne({
      where: { id: ticketId },
      relations: ['slot', 'slot.vehicle'],
    });

    if (!ticket) {
      throw new NotFoundException('Parking ticket not found');
    }

    if (ticket.exitTime) {
      throw new BadRequestException('Vehicle has already exited');
    }

    const exitTime = new Date();
    const durationInHours =
      (exitTime.getTime() - ticket.entryTime.getTime()) / 1000 / 60 / 60;
    const totalAmount = Math.ceil(durationInHours) * 5; // 5 dol per hour.

    ticket.exitTime = exitTime;
    ticket.totalAmount = totalAmount;

    if (ticket.slot.vehicle) {
      ticket.slot.vehicle = null;
      await this.parkingSlotService.removeVehicleFromSlot(ticket.slot);
    }

    return this.parkingTicketRepository.save(ticket);
  }
}
