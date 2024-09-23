import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './enums/vehicle-type.enum';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(licensePlate: string, vehicleType: VehicleType) {
    let vehicle = await this.vehicleRepository.findOne({
      where: { licensePlate },
    });

    if (!vehicle) {
      vehicle = this.vehicleRepository.create({
        licensePlate,
        type: vehicleType,
      });
      return await this.vehicleRepository.save(vehicle);
    }

    return vehicle;
  }
}
