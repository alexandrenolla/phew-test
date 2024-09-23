import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'parking-tickets' })
export class ParkingTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingSlot)
  slot: ParkingSlot;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @CreateDateColumn()
  entryTime: Date;

  @UpdateDateColumn({ nullable: true })
  exitTime: Date;

  @Column({ nullable: true })
  totalAmount: number;
}
