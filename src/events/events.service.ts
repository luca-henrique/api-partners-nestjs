import { HttpCode, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private primaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.primaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  findAll() {
    return this.primaService.event.findMany();
  }

  findOne(id: string) {
    return this.primaService.event.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.primaService.event.update({
      data: {
        ...updateEventDto,
        date: new Date(updateEventDto.date),
      },
      where: { id },
    });
  }

  @HttpCode(204)
  remove(id: string) {
    return this.primaService.event.delete({
      where: { id },
    });
  }
}
