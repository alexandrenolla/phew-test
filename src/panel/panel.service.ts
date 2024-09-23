import { Injectable } from '@nestjs/common';
import { CreatePanelDto } from './dto/create-panel.dto';
import { UpdatePanelDto } from './dto/update-panel.dto';
import { Panel } from './entities/panel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PanelType } from './enums/panel.enum';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(Panel)
    private panelRepository: Repository<Panel>,
  ) {}

  async installPanel(floorId: number, panelType: PanelType): Promise<Panel> {
    const panel = this.panelRepository.create({
      type: panelType,
      floor: { id: floorId },
    });
    return this.panelRepository.save(panel);
  }
}
