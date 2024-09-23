import { Injectable } from '@nestjs/common';
import { CreateGridDto } from './dto/create-grid.dto';
import { UpdateGridDto } from './dto/update-grid.dto';
import { Grid } from './entities/grid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';

@Injectable()
export class GridService {
  constructor(
    @InjectRepository(Grid)
    private gridRepository: Repository<Grid>,
  ) {}

  async checkAvailableParkingSlots(floorId: number): Promise<Grid[]> {
    const grids = await this.gridRepository.find({
      where: { floor: { id: floorId } },
      relations: ['floor'],
    });

    const availableSlots = grids.filter(
      (grid) => grid.type === SlotType.PARKING_SLOT && !grid.isOccupied,
    );

    return availableSlots;
  }
}
