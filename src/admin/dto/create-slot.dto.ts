import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';

export class CreateSlotDto {
  @ApiProperty({
    example: 9,
    description: 'Floor number',
  })
  @IsNotEmpty()
  @IsNumber()
  slotNumber: number;

  @ApiProperty({
    example: SlotType.CAR,
    description: 'Slot type',
    type: 'enum',
  })
  @IsNotEmpty()
  slotType: SlotType;
}
