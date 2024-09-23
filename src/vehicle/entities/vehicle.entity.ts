import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleType } from '../enums/vehicle-type.enum';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  type: VehicleType;

  @OneToOne(() => ParkingSlot, (slot) => slot.vehicle)
  slot: ParkingSlot;
}
