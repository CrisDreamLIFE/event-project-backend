import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class EventService {

  private readonly events: Event[] = [];

  create(createEventDto: CreateEventDto) {
    const id = uuidv4();
    const newEvent = new Event(id, createEventDto.title, createEventDto.date);
    this.events.push(newEvent);
    return id;
  }

  findAll() {
    return this.events;
  }

  findOne(id: string) {
    return this.getServiceById(id)[0];
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const [targetEvent, index] = this.getServiceById(id);
    this.events[index] = Object.assign(targetEvent, updateEventDto)
    return this.events[index];
  }

  remove(id: string) {
    const [, index] = this.getServiceById(id);
    this.events.splice(index, 1)
  }

  private getServiceById(id: string): [Event, number] {
    const index = this.events.findIndex((event) => event.id === id);
    return [this.events[index], index];
  }
}
