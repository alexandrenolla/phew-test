import { Grid } from 'src/grid/entities/grid.entity';
import { Panel } from 'src/panel/entities/panel.entity';
import { ParkingLot } from 'src/parking-lot/entities/parking-lot.entity';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'floors' })
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @ManyToOne(() => ParkingLot, (parkingLot) => parkingLot.floors)
  parkingLot: ParkingLot;

  @OneToMany(() => ParkingSlot, (slot) => slot.floor)
  slots: ParkingSlot[];

  @OneToMany(() => Panel, (panel) => panel.floor)
  panels: Panel[];

  @OneToMany(() => Grid, (grid) => grid.floor)
  grids: Grid[];
}
