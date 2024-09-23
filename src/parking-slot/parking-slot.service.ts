import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSlot } from './entities/parking-slot.entity';
import { Repository } from 'typeorm';
import { VehicleType } from 'src/vehicle/enums/vehicle-type.enum';
import { SlotType } from './enums/slot-type.enum';

@Injectable()
export class ParkingSlotService {
  constructor(
    @InjectRepository(ParkingSlot)
    private parkingSlotRepository: Repository<ParkingSlot>,
  ) {}

  async findAvailableSlot(vehicleType: VehicleType): Promise<ParkingSlot> {
    const availableSlot = await this.parkingSlotRepository.findOne({
      where: { type: vehicleType as unknown as SlotType },
      relations: ['floor'],
    });

    if (!availableSlot) {
      throw new NotFoundException('No available parking slot');
    }

    return availableSlot;
  }

  async addOrModifySlot(
    floorId: number,
    slotNumber: number,
    slotType: SlotType,
  ): Promise<ParkingSlot> {
    let slot = await this.parkingSlotRepository.findOne({
      where: { number: slotNumber, floor: { id: floorId } },
    });

    if (!slot) {
      slot = this.parkingSlotRepository.create({
        number: slotNumber,
        type: slotType,
        floor: { id: floorId },
      });
    } else {
      slot.type = slotType;
    }
    return this.parkingSlotRepository.save(slot);
  }

  async removeSlot(slotId: number): Promise<void> {
    const slot = await this.parkingSlotRepository.findOne({
      where: {
        id: slotId,
      },
    });
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }
    await this.parkingSlotRepository.remove(slot);
  }

  async removeVehicleFromSlot(slot: ParkingSlot): Promise<void> {
    const slotId = slot.id;
    const foundSlot = await this.parkingSlotRepository.findOne({
      where: {
        id: slotId,
      },
      relations: ['vehicle'],
    });

    if (!foundSlot) {
      throw new NotFoundException('Slot not found');
    }

    foundSlot.vehicle = null;
    await this.parkingSlotRepository.save(foundSlot);
  }

  async canIssueTicket(
    vehicleType: SlotType,
    floorId: number,
  ): Promise<boolean> {
    const availableSlot = await this.parkingSlotRepository.findOne({
      where: { floor: { id: floorId }, type: vehicleType, vehicle: null },
    });
    return !!availableSlot;
  }

  async checkAvailability(parkingLotId: number): Promise<number> {
    const slots = await this.parkingSlotRepository.find({
      where: { parkingLot: { id: parkingLotId } },
      relations: ['vehicle'],
    });

    const availableSlots = slots.filter((slot) => !slot.vehicle);
    return availableSlots.length;
  }
}
