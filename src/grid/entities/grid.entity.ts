import { Floor } from 'src/floor/entities/floor.entity';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'grids' })
export class Grid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @Column({
    type: 'enum',
    enum: SlotType,
  })
  type: SlotType;

  @Column({ default: false })
  isOccupied: boolean;

  @ManyToOne(() => Floor, (floor) => floor.grids)
  floor: Floor;
}
