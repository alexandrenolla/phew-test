import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'parking-tickets' })
export class ParkingTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingSlot)
  @JoinColumn({ name: 'parking_slot_id' })
  slot: ParkingSlot;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @CreateDateColumn({ name: 'entry_time' })
  entryTime: Date;

  @UpdateDateColumn({ name: 'exit_time', nullable: true })
  exitTime: Date;

  @Column({ name: 'total_amount', nullable: true })
  totalAmount: number;
}
