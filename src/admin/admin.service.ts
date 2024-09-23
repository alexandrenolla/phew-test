import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FloorService } from 'src/floor/floor.service';
import { ParkingSlotModule } from 'src/parking-slot/parking-slot.module';
import { PanelService } from 'src/panel/panel.service';
import { Floor } from 'src/floor/entities/floor.entity';
import { SlotType } from 'src/parking-slot/enums/slot-type.enum';
import { ParkingSlot } from 'src/parking-slot/entities/parking-slot.entity';
import { ParkingSlotService } from 'src/parking-slot/parking-slot.service';
import { PanelType } from 'src/panel/enums/panel.enum';
import { Panel } from 'src/panel/entities/panel.entity';
import { GridService } from 'src/grid/grid.service';
import { Grid } from 'src/grid/entities/grid.entity';

@Injectable()
export class AdminService {
  private floorService: FloorService;
  private parkingSlotService: ParkingSlotService;
  private panelService: PanelService;
  private gridService: GridService;

  async addFloor(paringLotId: number, floorNumber: number): Promise<Floor> {
    return await this.floorService.addFloor(paringLotId, floorNumber);
  }

  async removeFloor(floorId: number): Promise<void> {
    return await this.floorService.removeFloor(floorId);
  }

  async addOrModifySlot(
    floorId: number,
    slotNumber: number,
    slotType: SlotType,
  ): Promise<ParkingSlot> {
    return await this.parkingSlotService.addOrModifySlot(
      floorId,
      slotNumber,
      slotType,
    );
  }

  async removeSlot(slotId: number): Promise<void> {
    return await this.parkingSlotService.removeSlot(slotId);
  }

  async installPanel(floorId: number, panelType: PanelType): Promise<Panel> {
    return await this.panelService.installPanel(floorId, panelType);
  }

  async getAllocationStatus(floorId: number): Promise<any> {
    return await this.floorService.getAllocationStatus(floorId);
  }

  async canIssueTicket(
    vehicleType: SlotType,
    floorId: number,
  ): Promise<boolean> {
    return await this.parkingSlotService.canIssueTicket(vehicleType, floorId);
  }

  async checkAvailableParkingSlots(floorId: number): Promise<Grid[]> {
    return await this.gridService.checkAvailableParkingSlots(floorId);
  }
}
