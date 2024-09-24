import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleType } from '../enums/vehicle-type.enum';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
    name: 'type',
  })
  type: VehicleType;

  @OneToOne(() => ParkingSlot, (slot) => slot.vehicle)
  slot: ParkingSlot;
}
