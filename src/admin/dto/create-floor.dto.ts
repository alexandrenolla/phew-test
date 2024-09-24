import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFloorDto {
  @ApiProperty({
    example: 9,
    description: 'Floor number',
  })
  @IsNotEmpty()
  @IsNumber()
  floorNumber: number;
}
