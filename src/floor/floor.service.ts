import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorService {
  constructor(
    @InjectRepository(Floor)
    private floorRepository: Repository<Floor>,
  ) {}

  async addFloor(parkingLotId: number, floorNumber: number): Promise<Floor> {
    const floor = this.floorRepository.create({
      number: floorNumber,
      parkingLot: { id: parkingLotId },
    });
    return this.floorRepository.save(floor);
  }

  async removeFloor(floorId: number): Promise<void> {
    const floor = await this.floorRepository.findOne({
      where: {
        id: floorId,
      },
    });
    if (!floor) {
      throw new NotFoundException('Floor not found');
    }
    await this.floorRepository.remove(floor);
  }

  async getAllocationStatus(floorId: number): Promise<any> {
    const floor = await this.floorRepository.findOne({
      where: {
        id: floorId,
      },
      relations: ['slots', 'slots.vehicle'],
    });

    if (!floor) {
      throw new NotFoundException('Floor not found');
    }

    return floor.slots.map((slot) => ({
      slotNumber: slot.number,
      isOccupied: !!slot.vehicle,
      vehicleType: slot.vehicle?.type || null,
    }));
  }

  async findOne(floorId: number) {
    const floor = await this.floorRepository.findOne({
      where: {
        id: floorId,
      },
    });

    if (!floor) {
      throw new NotFoundException(`Floor with id ${floorId} not found.`);
    }

    return floor;
  }
}
