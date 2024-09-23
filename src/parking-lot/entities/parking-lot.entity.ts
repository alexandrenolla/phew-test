import { Floor } from 'src/floor/entities/floor.entity';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'parking-lots' })
export class ParkingLot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.parkingLot)
  slots: ParkingSlot[];

  @OneToMany(() => Floor, (floor) => floor.parkingLot)
  floors: Floor[];
}
