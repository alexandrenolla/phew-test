import { Test, TestingModule } from '@nestjs/testing';
import { ParkingTicketService } from './parking-ticket.service';

describe('ParkingTicketService', () => {
  let service: ParkingTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingTicketService],
    }).compile();

    service = module.get<ParkingTicketService>(ParkingTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
