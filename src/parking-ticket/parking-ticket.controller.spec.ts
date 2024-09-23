import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTicketController } from './parking-ticket.controller';
import { ParkingTicketService } from './parking-ticket.service';

describe('ParkingTicketController', () => {
  let controller: ParkingTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingTicketController],
      providers: [ParkingTicketService],
    }).compile();

    controller = module.get<ParkingTicketController>(ParkingTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
