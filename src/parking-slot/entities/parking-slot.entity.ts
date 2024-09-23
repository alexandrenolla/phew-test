import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SlotType } from '../enums/slot-type.enum';
import { Floor } from 'src/floor/entities/floor.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { ParkingLot } from 'src/parking-lot/entities/parking-lot.entity';

@Entity({ name: 'parking-slots' })
export class ParkingSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({
    type: 'enum',
    enum: SlotType,
  })
  type: SlotType;

  @ManyToOne(() => Floor, (floor) => floor.slots)
  floor: Floor;

  @ManyToOne(() => ParkingLot, (parkingLot) => parkingLot.slots)
  parkingLot: ParkingLot;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.slot, { nullable: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
