import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';
import { CreateFloorDto } from './dto/create-floor.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateSlotDto } from './dto/create-slot.dto';
import { CreatePanelTypeDto } from './dto/create-panel.dto';
import { Panel } from 'src/panel/entities/panel.entity';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { Floor } from 'src/floor/entities/floor.entity';
import { VehicleType } from 'src/vehicle/enums/vehicle-type.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('floor/:parkingLotId')
  @ApiOperation({
    summary: 'To create a floor.',
  })
  @ApiParam({
    name: 'parkingLotId',
    example: 5,
    required: true,
  })
  @ApiBody({ type: CreateFloorDto })
  @ApiResponse({
    status: 201,
    type: Floor,
  })
  addFloor(
    @Param('parkingLotId') parkingLotId: number,
    @Body() createFloorDto: CreateFloorDto,
  ) {
    return this.adminService.addFloor(parkingLotId, createFloorDto.floorNumber);
  }

  @Delete('floor/:floorId')
  @ApiOperation({
    summary: 'To delete a floor.',
  })
  @ApiParam({
    name: 'floorId',
    example: 5,
    required: true,
  })
  @ApiResponse({
    status: 200,
  })
  removeFloor(@Param('floorId') floorId: number) {
    return this.adminService.removeFloor(floorId);
  }

  @Post('slot/:floorId')
  @ApiOperation({
    summary: 'To create or modify a slot.',
  })
  @ApiBody({ type: CreateSlotDto })
  @ApiResponse({
    status: 201,
    type: ParkingSlot,
  })
  addOrModifySlot(
    @Param('floorId') floorId: number,
    @Body() createSlotDto: CreateSlotDto,
  ) {
    return this.adminService.addOrModifySlot(floorId, createSlotDto);
  }

  @Delete('slot/:slotId')
  @ApiOperation({
    summary: 'To delete a slot.',
  })
  @ApiParam({
    name: 'slotId',
    example: 5,
    required: true,
  })
  @ApiResponse({
    status: 200,
  })
  removeSlot(@Param('slotId') slotId: number) {
    return this.adminService.removeSlot(slotId);
  }

  @Post('panel/:floorId')
  @ApiOperation({
    summary: 'To create a panel placement.',
  })
  @ApiParam({
    name: 'floorId',
    example: 5,
    required: true,
  })
  @ApiBody({ type: CreatePanelTypeDto })
  @ApiResponse({
    status: 201,
    type: Panel,
  })
  installPanel(
    @Param('floorId') floorId: number,
    @Body() createPanelTypeDto: CreatePanelTypeDto,
  ) {
    return this.adminService.installPanel(floorId, createPanelTypeDto.type);
  }

  @Get('allocation/:floorId')
  @ApiOperation({
    summary: 'To get allocation status for a specific floor.',
  })
  @ApiParam({
    name: 'floorId',
    example: 5,
    required: true,
  })
  getAllocationStatus(@Param('floorId') floorId: number) {
    return this.adminService.getAllocationStatus(floorId);
  }

  @Get('can-issue-ticket/:floorId/:vehicleType')
  @ApiParam({
    name: 'floorId',
    example: 5,
    required: true,
  })
  @ApiParam({
    name: 'vehicleType',
    example: VehicleType.CAR,
    required: true,
  })
  canIssueTicket(
    @Param('floorId') floorId: number,
    @Param('vehicleType') vehicleType: SlotType,
  ) {
    return this.adminService.canIssueTicket(vehicleType, floorId);
  }
}
