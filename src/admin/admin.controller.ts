import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';
import { PanelType } from 'src/panel/enums/panel.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('floor/:parkingLotId')
  addFloor(
    @Param('parkingLotId') parkingLotId: number,
    @Body('floorNumber') floorNumber: number,
  ) {
    return this.adminService.addFloor(parkingLotId, floorNumber);
  }

  @Delete('floor/:floorId')
  removeFloor(@Param('floorId') floorId: number) {
    return this.adminService.removeFloor(floorId);
  }

  @Post('slot/:floorId')
  addOrModifySlot(
    @Param('floorId') floorId: number,
    @Body('slotNumber') slotNumber: number,
    @Body('slotType') slotType: SlotType,
  ) {
    return this.adminService.addOrModifySlot(floorId, slotNumber, slotType);
  }

  @Delete('slot/:slotId')
  removeSlot(@Param('slotId') slotId: number) {
    return this.adminService.removeSlot(slotId);
  }

  @Post('panel/:floorId')
  installPanel(
    @Param('floorId') floorId: number,
    @Body('panelType') panelType: PanelType,
  ) {
    return this.adminService.installPanel(floorId, panelType);
  }

  @Get('allocation/:floorId')
  getAllocationStatus(@Param('floorId') floorId: number) {
    return this.adminService.getAllocationStatus(floorId);
  }

  @Get('can-issue-ticket/:floorId/:vehicleType')
  canIssueTicket(
    @Param('floorId') floorId: number,
    @Param('vehicleType') vehicleType: SlotType,
  ) {
    return this.adminService.canIssueTicket(vehicleType, floorId);
  }
}
