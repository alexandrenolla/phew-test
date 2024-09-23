import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingTicketDto } from './create-parking-ticket.dto';

export class UpdateParkingTicketDto extends PartialType(CreateParkingTicketDto) {}
