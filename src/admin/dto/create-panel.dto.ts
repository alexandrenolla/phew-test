import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PanelType } from 'src/panel/enums/panel.enum';

export class CreatePanelTypeDto {
  @ApiProperty({
    example: PanelType.ENTRY,
    description: 'Panel type',
    type: 'enum',
  })
  @IsNotEmpty()
  type: PanelType;
}
