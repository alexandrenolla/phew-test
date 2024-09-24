import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PanelType } from '../enums/panel.enum';
import { Floor } from 'src/floor/entities/floor.entity';

@Entity({ name: 'panels' })
export class Panel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PanelType,
    name: 'type',
  })
  type: PanelType;

  @ManyToOne(() => Floor, (floor) => floor.panels)
  @JoinColumn({ name: 'floor_id' })
  floor: Floor;
}
